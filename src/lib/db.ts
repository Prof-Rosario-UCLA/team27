import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

let db: Db | null = null;

export async function getDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db("project");
  }
  return db;
}
