import { NextRequest, NextResponse } from "next/server";
import { tavily, TavilyExtractResponse } from "@tavily/core";
import { chunkify, embed } from "@/lib/nlp";
import { getDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let response: TavilyExtractResponse

  try {
    const tavilyClient = tavily({
      apiKey: process.env.TAVILY_API_KEY || "",
    });

    response = await tavilyClient.extract([url], {
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
      source: response.results[0].url,
    }));
    const db = await getDB();
    await db.collection("embedded_chunks").insertMany(documents);
    await db.collection("documents").insertOne({
      content: response.results[0].rawContent,
      source: response.results[0].url,
      type: "web",
    });
  } catch (error) {
    console.error("Error processing URL:", error);
    return NextResponse.json(
      { error: "Could not process URL" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { source: response.results[0].url },
    { status: 200 }
  );
}
