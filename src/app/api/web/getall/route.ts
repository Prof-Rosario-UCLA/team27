import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  const db = await getDB();
  const results = await db
    .collection("documents")
    .find({}, { projection: { source: 1, _id: 0 } });

  const urls = (await results.toArray()).map(doc => doc.source);

  if (!urls || urls.length == 0) {
    return NextResponse.json({ urls: [] }, { status: 200 });
  }

  return NextResponse.json({ urls: urls }, { status: 200 });
}
