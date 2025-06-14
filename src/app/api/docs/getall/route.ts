import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDB();
  const results = await db
    .collection("documents")
    .find(
      { type: "file", owner: session.user?.email },
      { projection: { source: 1, _id: 0 } }
    );

  const urls = (await results.toArray()).map((doc) => doc.source);

  if (!urls || urls.length == 0) {
    return NextResponse.json({ urls: [] }, { status: 200 });
  }

  return NextResponse.json({ urls: urls }, { status: 200 });
}
