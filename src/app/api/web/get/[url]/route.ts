import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  if (!params.url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let decodedUrl: string;
  try {
    decodedUrl = decodeURIComponent(params.url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const db = await getDB();
  const result = await db.collection("documents").findOne({
    source: decodedUrl,
  });

  if (!result) {
    return NextResponse.json(
      { error: "Document could not be found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ content: result.content }, { status: 200 });
}
