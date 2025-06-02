"use client";

import { VStack, HStack, Text, Box, Input } from "@chakra-ui/react";

export default function LibraryView() {
  return (
    <>
      <Text fontSize="xl" fontWeight="semibold" p="4">
        Library
      </Text>
      <HStack justifyContent="space-between">
        <Box>
          <VStack>
            <Text>Web</Text>
            <Input></Input>
            <Text>Sources</Text>
          </VStack>
        </Box>
        <Box>
          <VStack>
            <Text>Documents</Text>
            <Box borderWidth="1px"></Box>
            <Text>Sources</Text>
          </VStack>
        </Box>
      </HStack>
    </>
  );
}
