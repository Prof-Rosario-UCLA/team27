"use client";

import Sidebar from "@/components/sidebar";
import ChatView from "@/features/chat/chatview";
import LibraryView from "@/features/library/libraryview";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<
    "chat" | "library" | "settings"
  >("chat");

  return (
    <>
      <Sidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      ></Sidebar>
      <Box ml="200px">
        {selectedTab === "chat" && <ChatView />}
        {selectedTab === "library" && <LibraryView />}
      </Box>
    </>
  );
}
