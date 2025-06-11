"use client";

import { VStack, Text, Input, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

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
        body: JSON.stringify({ message: currentMessage }),
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

  const { data: session } = useSession();

  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" p="4">
        Chat
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <VStack px="16">
          <Text fontSize="2xl" fontWeight="semibold">
            Welcome, {session?.user?.name || "Guest"}
          </Text>
          <Input
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            value={currentMessage}
            placeholder="What's in my syllabus for CS 144?"
          ></Input>
          <Button type="submit" onClick={onSubmit} colorScheme="blue">
            Go
          </Button>
          {agentResponse && <Text fontSize="lg">{agentResponse}</Text>}
        </VStack>
      </form>
    </Box>
  );
}
