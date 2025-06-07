import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getDB } from "@/lib/db";
import { embed } from "@/lib/nlp";

export const searchTool = new DynamicStructuredTool({
  name: "search_knowledge_base",
  description: "Searches the knowledge base for relevant information.",
  schema: z.object({
    query: z
      .string()
      .describe("The query to search for in the knowledge base."),
  }),
  func: async ({ query }: { query: string }) => {

    const db = await getDB();

    try {
      const embeddedQuery = (await embed([query]))[0];
      const aggregation = [
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embeddings",
            queryVector: embeddedQuery,
            numCandidates: 150,
            limit: 10,
          },
        },
        {
          $project: {
            _id: 0,
            source: 1,
            score: {
              $meta: "vectorSearchScore",
            },
          },
        },
      ];

      const results = await db
        .collection("embedded_chunks")
        .aggregate(aggregation)
        .toArray();

      const source2Score = new Map<string, number>();
      for (const result of results) {
        if (
          !source2Score.has(result["source"]) ||
          result["score"] > source2Score.get(result["source"])!
        ) {
          source2Score.set(result["source"], result["score"]);
        }
      }

      const fullContent = await db
        .collection("documents")
        .find({
          source: { $in: [...source2Score.keys()] },
        })
        .toArray();

      for (const doc of fullContent) {
        doc["score"] = source2Score.get(doc["source"]);
      }

      return JSON.stringify(fullContent);
    } catch (error) {
      console.error("Knowledge base retrieval error", error);
      return JSON.stringify([]);
    }
  },
});
