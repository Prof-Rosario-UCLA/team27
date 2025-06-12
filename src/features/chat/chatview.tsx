"use client";

import React from "react";
import { VStack, Text, Input, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ChatBubble from "@/components/chatBubble";

export default function ChatView() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setMessageHistory((prev) => [...prev, currentMessage]);
    setLoading(true);
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
      setMessageHistory((prev) => [...prev, data.answer]);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
    setLoading(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const { data: session } = useSession();

  return (
    <VStack h="100vh" px="16">
      <Box p="4">
        <Text fontSize="xl" fontWeight="semibold">
          Chat
        </Text>
      </Box>
      <VStack
        px="4"
        gap="4"
        flex="1"
        overflowY="auto"
        align="flex-start"
        justify="flex-start"
        w="100%"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Welcome, {session?.user?.name || "Guest"}
        </Text>
        {messageHistory.map((message, index) => (
          <ChatBubble
            key={index}
            sender={index % 2 == 0 ? "user" : "agent"}
            message={message}
          />
        ))}

        {loading && <Text>Loading...</Text>}
      </VStack>
      <Box as="form" onSubmit={handleSubmit} mb="12" w="100%">
        <Input
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          value={currentMessage}
          placeholder="What's in my syllabus for CS 144?"
          h="75px"
          w="100%"
        ></Input>
      </Box>
    </VStack>
  );
}
