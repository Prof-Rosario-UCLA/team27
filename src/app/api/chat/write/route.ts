import { agent } from "@/lib/agent";
import { HumanMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { threadId, message } = await request.json();

  try {
    const agentResult = await agent.invoke(
      { messages: [new HumanMessage(message)] },
      { configurable: { thread_id: threadId } }
    );
    const answer = agentResult.messages.at(-1)?.text || "No answer.";
    return new NextResponse(JSON.stringify({ answer }), { status: 200 });
  } catch (error) {
    console.error("Agent error", error);
    return new NextResponse(JSON.stringify({ error: "Agent error " }), {
      status: 500,
    });
  }
}
