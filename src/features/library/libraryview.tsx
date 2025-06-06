"use client";

import { Stack, Text, Flex, Box } from "@chakra-ui/react";
import WebSection from "./components/web";
import DocSection from "./components/documents";

export default function LibraryView() {
  return (
    <Box bgColor="white" minH="100vh" maxH="100vh">
      <Text fontSize="xl" fontWeight="semibold" p="4">
        Library
      </Text>
      <Stack
        px="16"
        direction={{
          base: "column",
          xl: "row",
        }}
        gap="16"
        align="top"
        mx="auto"
      >
        <Flex
          w="full"
          justify="center"
          align={{ base: "center", xl: "flex-start" }}
        >
          <WebSection />
        </Flex>
        <Flex
          w="full"
          justify="center"
          align={{ base: "center", xl: "flex-start" }}
        >
          <DocSection />
        </Flex>
      </Stack>
    </Box>
  );
}
