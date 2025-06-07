process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
process.env.TAVILY_API_KEY = process.env.TAVILY_API_KEY || "";

import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { searchTool } from "@/lib/search";

const agentTools = [searchTool];
const agentModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});

const agentCheckpointer = new MemorySaver();
export const agent = createReactAgent({
  prompt: `You are a helpful assistant that can answer questions. You have access to a knowledge base that you can search. When you receive a question, you MUST search the knowledge base for relevant information. If the answer to the question is not found in the knowledge base, you MUST say "I don't know." You MUST NOT make up answers.`,
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});
