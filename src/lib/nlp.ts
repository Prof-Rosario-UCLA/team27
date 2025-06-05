import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";

export async function chunkify(text: string): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitText(text);
  return chunks;
}

export async function embed(chunks: string[]): Promise<number[][]> {
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY || "" });
  const vectors = await embeddings.embedDocuments(chunks);
  return vectors;
}
