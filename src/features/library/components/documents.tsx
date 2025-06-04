import { Box, VStack, Text } from "@chakra-ui/react";

export default function DocSection() {
  return (
    <Box>
      <VStack>
        <Text fontSize="2xl" fontWeight="semibold">Documents</Text>
        <Box borderWidth="1px"></Box>
        <Text fontSize="xl">Sources</Text>
      </VStack>
    </Box>
  );
}
