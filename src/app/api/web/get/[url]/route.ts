import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ url: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await params;

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let decodedUrl: string;
  try {
    decodedUrl = decodeURIComponent(url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const db = await getDB();
  const result = await db.collection("documents").findOne({
    source: decodedUrl,
    owner: session.user?.email,
  });

  if (!result) {
    return NextResponse.json(
      { error: "Document could not be found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ content: result.content }, { status: 200 });
}
