import { NextRequest, NextResponse } from "next/server";
import { ocrFile } from "@/lib/ocr";
import { chunkify, embed } from "@/lib/nlp";
import { getDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const base64File = Buffer.from(bytes).toString("base64");

  console.log("Processing file:", file.name, file.type);

  const fileContent = await ocrFile(
    base64File,
    file.name,
    file.type == "application/pdf"
      ? "pdf"
      : file.type == "image/png"
      ? "png"
      : "jpeg"
  );

  console.log("Processed file:" + file.name, "Content length:", fileContent.length);

  const chunks = await chunkify(fileContent);
  const embeddings = await embed(chunks);
  const documents = embeddings.map((vector, index) => ({
    content: chunks[index],
    embeddings: vector,
    source: file.name,
  }));
  const db = await getDB();
  await db.collection("embedded_chunks").insertMany(documents);
  await db.collection("documents").insertOne({
    content: fileContent,
    source: file.name,
  });

  return NextResponse.json({ source: file.name }, { status: 200 });
}
