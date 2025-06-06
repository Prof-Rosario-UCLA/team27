"use client";

import { VStack } from "@chakra-ui/react";
// import { FaRegUser, FaRegFolderClosed, FaRegComment } from "react-icons/fa6";
import { FiSidebar } from "react-icons/fi";

export default function SmallSidebar({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <VStack
      position="fixed"
      top="0"
      left="0"
      p="4"
      height="100vh"
      width="50px"
      bg="white"
      alignItems="left"
    >
      <FiSidebar
        size="24"
        color="black"
        onClick={() => {
          setSidebarOpen(true);
        }}
      />
    </VStack>
  );
}
