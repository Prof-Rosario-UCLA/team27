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
        h="full"
        minH="calc(100vh - 64px)"
      >
        <Flex
          w="full"
          justify="center"
          align={{ base: "center", xl: "flex-start" }}
          mb={{ base: "0", xl: "16" }}
        >
          <WebSection />
        </Flex>
        <Flex
          w="full"
          justify="center"
          align={{ base: "center", xl: "flex-start" }}
          mb="16"
        >
          <DocSection />
        </Flex>
      </Stack>
    </Box>
  );
}
