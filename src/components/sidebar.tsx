"use client";

import { VStack, HStack, Text } from "@chakra-ui/react";
import { FaSearch, FaBook, FaFacebookMessenger } from "react-icons/fa";

export default function Sidebar({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "chat" | "library" | "settings";
  setSelectedTab: (tab: "chat" | "library" | "settings") => void;
}) {
  return (
    <VStack
      position="fixed"
      top="0"
      left="0"
      p="4"
      height="100vh"
      width="200px"
      bg="gray.800"
      alignItems="left"
    >
      <Text px="2" fontSize="2xl" fontWeight="semibold">
        Jarvis
      </Text>
      <HStack
        color={selectedTab == "chat" ? "blue.500" : "white"}
        bg={selectedTab == "chat" ? "gray.700" : "transparent"}
        onClick={() => setSelectedTab("chat")}
        cursor="pointer"
        px="2"
        py="1"
        borderRadius="md"
        _hover={{
          bg: "gray.600",
        }}
      >
        <FaFacebookMessenger />
        <Text>Chat</Text>
      </HStack>
      <HStack
        color={selectedTab == "library" ? "blue.500" : "white"}
        bg={selectedTab == "library" ? "gray.700" : "transparent"}
        onClick={() => setSelectedTab("library")}
        cursor="pointer"
        px="2"
        py="1"
        borderRadius="md"
        _hover={{
          bg: "gray.600",
        }}
      >
        <FaBook />
        <Text>Library</Text>
      </HStack>
      <HStack
        color={selectedTab == "settings" ? "blue.500" : "white"}
        bg={selectedTab == "settings" ? "gray.700" : "transparent"}
        onClick={() => setSelectedTab("settings")}
        cursor="pointer"
        px="2"
        py="1"
        borderRadius="md"
        _hover={{
          bg: "gray.600",
        }}
      >
        <FaSearch />
        <Text>Settings</Text>
      </HStack>
    </VStack>
  );
}
