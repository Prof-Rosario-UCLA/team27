"use client";

import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<
    "chat" | "library" | "settings"
  >("chat");

  return (
    <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Navbar>
  );
}
