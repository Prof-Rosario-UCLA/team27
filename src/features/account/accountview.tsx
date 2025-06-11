"use client";

import { Button, Box, VStack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function AccountView() {
  const { data: session } = useSession();

  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" p="4">
        Account
      </Text>
      <VStack px="16">
        <Text fontSize="2xl" fontWeight="semibold">
          {session?.user?.name}&apos;s Account
        </Text>
        <Button
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign Out
        </Button>
      </VStack>
    </Box>
  );
}
