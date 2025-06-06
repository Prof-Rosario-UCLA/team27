import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Spinner,
  Button,
  HStack,
  Code,
} from "@chakra-ui/react";
import MarkdownRenderer from "./markdown";
import { useEffect, useState } from "react";

interface DocumentModalProps {
  isOpen: boolean;
  selectedDocument: string;
  onClose: () => void;
}

export default function DocumentModal({
  isOpen,
  selectedDocument,
  onClose,
}: DocumentModalProps) {
  const [documentBody, setDocumentBody] = useState<string>("");
  const [documentLoading, setDocumentLoading] = useState<boolean>(true);
  const [selectedMode, setSelectedMode] = useState<"raw" | "rendered">("raw");

  useEffect(() => {
    async function loadDocument() {
      if (selectedDocument && selectedDocument != "") {
        setDocumentLoading(true);
        console.log("Loading document:", selectedDocument);
        const encodedUrl = encodeURIComponent(selectedDocument);
        const response = await fetch("/api/web/get/" + encodedUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setDocumentBody(data.content);
        setDocumentLoading(false);
      }
    }

    if (isOpen) {
      loadDocument();
    }
  }, [isOpen, selectedDocument]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDocument}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <HStack>
                <Button
                  onClick={() => {
                    setSelectedMode("raw");
                  }}
                  bgColor={selectedMode == "raw" ? "blue.500" : "gray.200"}
                >
                  Raw
                </Button>
                <Button
                  onClick={() => {
                    setSelectedMode("rendered");
                  }}
                  bgColor={selectedMode == "rendered" ? "blue.500" : "gray.200"}
                >
                  Rendered
                </Button>
              </HStack>
              <Box alignItems="center" mt="4">
                {documentLoading && <Spinner />}
                {selectedMode == "raw" && (
                  <Code
                    borderRadius="md"
                    colorScheme="blackAlpha"
                    overflowX="auto"
                    maxWidth="100%"
                    p="4"
                  >
                    {documentBody}
                  </Code>
                )}
                {selectedMode == "rendered" && (
                  <MarkdownRenderer content={documentBody} />
                )}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
