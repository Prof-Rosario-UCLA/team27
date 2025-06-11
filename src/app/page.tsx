"use client";

import Sidebar from "@/components/sidebar";
import SmallSidebar from "@/components/smallSidebar";
import ChatView from "@/features/chat/chatview";
import LibraryView from "@/features/library/libraryview";
import AccountView from "@/features/account/accountview";
import { useEffect, useState } from "react";
import { Box, VStack, Button, useMediaQuery } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import CookieBanner from "@/components/cookieBanner";

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

  const { data: session } = useSession();

  return session ? (
    <>
      <CookieBanner />
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
      <Box pl={sidebarOpen ? "200px" : "0px"} transition="all 0.5s ease">
        {selectedTab === "chat" && <ChatView />}
        {selectedTab === "library" && <LibraryView />}
        {selectedTab === "settings" && <AccountView />}
      </Box>
    </>
  ) : (
    <Box>
      <VStack p="16">
        <Button
          onClick={() => {
            signIn("google");
          }}
        >
          Sign In
        </Button>
      </VStack>
    </Box>
  );
}
