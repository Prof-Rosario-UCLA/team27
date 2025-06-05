import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";

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
  const [documentBody, setDocumentBody] = useState("");
  const [documentLoading, setDocumentLoading] = useState(true);

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
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDocument}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {documentLoading && <Spinner />}
              <Text>{documentBody}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
