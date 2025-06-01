"use client";

import { VStack, HStack } from "@chakra-ui/react";
import { FaSearch, FaBook, FaFacebookMessenger } from "react-icons/fa";

export default function Navbar({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "chat" | "library" | "settings";
  setSelectedTab: (tab: "chat" | "library" | "settings") => void;
}) {

  return (
    <VStack
      pos="fixed"
      top="0"
      left="0"
      p="4"
      height="100vh"
      width="200px"
      bg="gray.800"
      alignItems="left"
    >
      <HStack
        color={selectedTab == "chat" ? "blue.500" : "white"}
        onClick={() => setSelectedTab("chat")}
        cursor="pointer"
      >
        <div>
          <FaFacebookMessenger />
        </div>
        <div>Chat</div>
      </HStack>
      <HStack
        color={selectedTab == "library" ? "blue.500" : "white"}
        onClick={() => setSelectedTab("library")}
        cursor="pointer"
      >
        <div>
          <FaBook />
        </div>
        <div>Library</div>
      </HStack>
      <HStack
        color={selectedTab == "settings" ? "blue.500" : "white"}
        onClick={() => setSelectedTab("settings")}
        cursor="pointer"
      >
        <div>
          <FaSearch />
        </div>
        <div>Settings</div>
      </HStack>
    </VStack>
  );
}
