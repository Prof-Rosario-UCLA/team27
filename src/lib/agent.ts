process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
process.env.TAVILY_API_KEY = process.env.TAVILY_API_KEY || "";

import { TavilySearch } from "@langchain/tavily";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const agentTools = [new TavilySearch({ tavilyApiKey: process.env.TAVILY_API_KEY, maxResults: 3 })];
const agentModel = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, model: "gpt-4o-mini", temperature: 0 });

const agentCheckpointer = new MemorySaver();
export const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});