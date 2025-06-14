import { agent } from "@/lib/agent";
import { HumanMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await request.json();

  try {
    const agentResult = await agent.invoke(
      { messages: [new HumanMessage(message)] },
      {
        configurable: {
          thread_id: session.user?.email,
          userId: session.user?.email,
        },
      }
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
