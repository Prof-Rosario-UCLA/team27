import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
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

  useEffect(() => {
    async function loadDocument() {
      if (selectedDocument && selectedDocument != "") {
        console.log("Loading document:", selectedDocument);
        const encodedUrl = encodeURIComponent(selectedDocument);
        const response = await fetch("/api/web/get/" + encodedUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setDocumentBody(data.content);
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
            <Text>{documentBody}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
