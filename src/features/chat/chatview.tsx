"use client";

import { agent } from "@/lib/agent";
import { VStack, Text, Input, Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function ChatView() {
  const [isNewChat, setIsNewChat] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [agentResponse, setAgentResponse] = useState("");

  const onSubmit = async () => {
    setIsNewChat(false);
    try {
      const response = await fetch("/api/chat/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ threadId: "default", message: currentMessage }),
      });
      if (!response.ok) {
        throw new Error("Agent error");
      }
      const data = await response.json();
      setAgentResponse(data.answer);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" p="4">
        Chat
      </Text>
      <VStack px="16">
        <Text fontSize="2xl" fontWeight="semibold">
          Talk to your knowledge base
        </Text>
        <Input
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          placeholder="What's in my syllabus for CS 144?"
        ></Input>
        <Button onClick={onSubmit} colorScheme="blue">
          {isNewChat ? "Start Chat" : "Send Message"}
        </Button>
        {agentResponse && <Text fontSize="lg">{agentResponse}</Text>}
      </VStack>
    </Box>
  );
}
