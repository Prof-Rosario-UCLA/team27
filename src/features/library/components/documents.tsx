import { Box, VStack, Text, Spinner } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import DocumentModal from "./documentModal";

export default function DocSection() {
  const [isDragging, setIsDragging] = useState(false);

  const [sources, setSources] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [sourcesLoading, setSourcesLoading] = useState(true);

  useEffect(() => {
    async function fetchSources() {
      setSourcesLoading(true);
      const response = await fetch("/api/docs/getall");
      if (!response.ok) {
        throw new Error("Failed to fetch sources");
      }
      const data = await response.json();
      setSources(data.urls);
      setSourcesLoading(false);
    }

    fetchSources();
  }, []);

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

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = Array.from(e.dataTransfer.files)[0];

      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/docs/add", { method: "POST", body });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data);
      } else {
        console.error("Error uploading file:", response.statusText);
      }

      e.dataTransfer.clearData();
    }
  }, []);

  return (
    <>
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
          <Box>
            {sourcesLoading && <Spinner />}
            {sources.map((source) => (
              <Text
                p="2"
                borderRadius="md"
                borderWidth="1px"
                key={source}
                onClick={() => {
                  setSelectedDocument(source);
                  setModalOpen(true);
                }}
              >
                {source}
              </Text>
            ))}
          </Box>
        </VStack>
      </Box>
      <DocumentModal
        isOpen={modalOpen}
        selectedDocument={selectedDocument}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}
