import { NextRequest, NextResponse } from "next/server";
import { ocrFile } from "@/lib/ocr";
import { chunkify, embed } from "@/lib/nlp";
import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const base64File = Buffer.from(bytes).toString("base64");

    const fileContent = await ocrFile(
      base64File,
      file.name,
      file.type == "application/pdf"
        ? "pdf"
        : file.type == "image/png"
        ? "png"
        : "jpeg"
    );

    const chunks = await chunkify(fileContent);
    const embeddings = await embed(chunks);
    const documents = embeddings.map((vector, index) => ({
      content: chunks[index],
      embeddings: vector,
      source: file.name,
      owner: session.user?.email,
    }));
    const db = await getDB();
    await db.collection("embedded_chunks").insertMany(documents);
    await db.collection("documents").insertOne({
      content: fileContent,
      source: file.name,
      type: "file",
      owner: session.user?.email,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Could not process file" },
      { status: 500 }
    );
  }

  return NextResponse.json({ source: file.name }, { status: 200 });
}
