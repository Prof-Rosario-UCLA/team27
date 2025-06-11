"use client";

import Sidebar from "@/components/sidebar";
import SmallSidebar from "@/components/smallSidebar";
import ChatView from "@/features/chat/chatview";
import LibraryView from "@/features/library/libraryview";
import AccountView from "@/features/account/accountview";
import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<
    "chat" | "library" | "settings"
  >("chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [wideScreen] = useMediaQuery("(min-width: 48em)", {
    ssr: true,
    fallback: false,
  });

  useEffect(() => {
    setSidebarOpen(wideScreen);
  }, [wideScreen]);

  return (
    <>
      {sidebarOpen && (
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setSidebarOpen={setSidebarOpen}
        ></Sidebar>
      )}
      {!sidebarOpen && (
        <SmallSidebar setSidebarOpen={setSidebarOpen}></SmallSidebar>
      )}
      <Box pl={sidebarOpen ? "200px" : "50px"} transition="all 0.5s ease">
        {selectedTab === "chat" && <ChatView />}
        {selectedTab === "library" && <LibraryView />}
        {selectedTab === "settings" && <AccountView />}
      </Box>
    </>
  );
}
