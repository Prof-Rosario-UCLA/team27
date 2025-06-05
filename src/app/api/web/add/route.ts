import { NextRequest, NextResponse } from "next/server";
import { tavily } from "@tavily/core";
import { chunkify, embed } from "@/lib/nlp";
import { getDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  const tavilyClient = tavily({
    apiKey: process.env.TAVILY_API_KEY || "",
  });

  const response = await tavilyClient.extract([url], {
    extractDepth: "advanced",
    format: "markdown",
  });

  if (response.results.length == 0) {
    return NextResponse.json(
      { error: "Unable to extract content from this URL" },
      { status: 400 }
    );
  }

  const chunks = await chunkify(response.results[0].rawContent);
  const embeddings = await embed(chunks);
  const documents = embeddings.map((vector, index) => ({
    content: chunks[index],
    embeddings: vector,
    source: url,
  }));
  const db = await getDB();
  await db.collection("embedded_chunks").insertMany(documents);
  await db.collection("documents").insertOne({
    content: response.results[0].rawContent,
    source: url,
  });

  return NextResponse.json(
    { message: response.results[0].rawContent },
    { status: 200 }
  );
}
