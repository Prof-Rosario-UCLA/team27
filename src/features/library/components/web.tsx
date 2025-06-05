import { Box, VStack, Text, Input, Button, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DocumentModal from "./documentModal";

export default function WebSection() {
  const [urlToAdd, setUrlToAdd] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [sourcesLoading, setSourcesLoading] = useState(true);

  useEffect(() => {
    async function fetchSources() {
      setSourcesLoading(true);
      const response = await fetch("/api/web/getall");
      if (!response.ok) {
        throw new Error("Failed to fetch sources");
      }
      const data = await response.json();
      setSources(data.urls);
      setSourcesLoading(false);
    }

    fetchSources();
  }, []);

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/web/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToAdd }),
      });
      if (!response.ok) {
        throw new Error("Failed to add URL");
      }
      const data = await response.json();
      setSources((previousSources) => [data.source, ...previousSources]);
    } catch (err) {
      console.error("Error adding URL:", err);
    }
  };

  return (
    <>
      <Box>
        <VStack>
          <Text fontSize="2xl" fontWeight="semibold">
            Web
          </Text>
          <Input
            placeholder="Enter a URL"
            onChange={(e) => {
              setUrlToAdd(e.target.value);
            }}
          ></Input>
          <Button onClick={onSubmit} colorScheme="blue">
            Add URL
          </Button>
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
