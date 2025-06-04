import { NextResponse } from "next/server";
import { tavily } from "@tavily/core";

export async function POST(request: Request) {
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

  return NextResponse.json({ message: response.results[0].rawContent }, { status: 200 });
}
