"use client";

import { VStack, Text, Input, Box } from "@chakra-ui/react";

export default function ChatView() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" p="4">
        Chat
      </Text>
      <VStack px="16">
        <Text fontSize="2xl" fontWeight="semibold">
          Talk to your knowledge base
        </Text>
        <Input></Input>
      </VStack>
    </Box>
  );
}
