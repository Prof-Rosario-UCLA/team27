import { Box, VStack, Text } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";

export default function DocSection() {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging]
  );

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      console.log("Files dropped:", files);
      e.dataTransfer.clearData();
    }
  }, []);

  return (
    <Box>
      <VStack>
        <Text fontSize="2xl" fontWeight="semibold">
          Documents
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="md"
          p="8"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <Text>Drag & drop, or click to select a file.</Text>
        </Box>
        <Text fontSize="xl">Sources</Text>
      </VStack>
    </Box>
  );
}
