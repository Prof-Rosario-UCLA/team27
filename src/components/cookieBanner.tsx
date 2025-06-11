"use client";

import { useState, useEffect } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasClosed = localStorage.getItem("cookieBannerClosed");
    if (!hasClosed) {
      setIsVisible(true);
    }
  }, []);

  const closeBanner = () => {
    localStorage.setItem("cookieBannerClosed", "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      w="100%"
      bgColor="gray.800"
      color="white"
      zIndex="banner"
      p="4"
    >
      <HStack>
        <Text fontSize="sm">
          This website uses cookies to enhance your experience. By continuing to
          use this site, you agree to our use of cookies.
        </Text>
        <Button onClick={closeBanner} bgColor="blue.400" ml="auto" mr="4">
          Close
        </Button>
      </HStack>
    </Box>
  );
}
