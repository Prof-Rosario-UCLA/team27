"use client";

import { VStack, Text, Input } from "@chakra-ui/react";

export default function ChatView() {
  return (
    <>
      <Text fontSize="xl" fontWeight="semibold" p="4">Chat</Text>
      <VStack>
        <Text fontSize="2xl" fontWeight="semibold">
          Talk to your knowledge base
        </Text>
        <Input></Input>
      </VStack>
    </>
  );
}
