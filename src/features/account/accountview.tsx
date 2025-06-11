"use client";

import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function AccountView() {
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  );
}
