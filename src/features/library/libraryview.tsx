"use client";

import { Stack, Text } from "@chakra-ui/react";
import WebSection from "./components/web";
import DocSection from "./components/documents";

export default function LibraryView() {
  return (
    <>
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
        justify="center"
        align="center"
        mx="auto"
      >
        <WebSection />
        <DocSection />
      </Stack>
    </>
  );
}
