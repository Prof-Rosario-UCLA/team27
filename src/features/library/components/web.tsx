import { Box, VStack, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function WebSection() {
  const [urlToAdd, setUrlToAdd] = useState("");

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/web/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToAdd }),
      });
      if (!response.ok) {
        throw new Error("Failed to add URL");
      }
      const data = await response.json();
      console.log("URL added successfully:", data);
    } catch (err) {
      console.error("Error adding URL:", err);
    }
  };

  return (
    <Box>
      <VStack>
        <Text fontSize="2xl" fontWeight="semibold">
          Web
        </Text>
        <Input
          placeholder="Enter a URL"
          onChange={(e) => {
            setUrlToAdd(e.target.value);
          }}
        ></Input>
        <Button onClick={onSubmit} colorScheme="blue">
          Add URL
        </Button>
        <Text>Sources</Text>
      </VStack>
    </Box>
  );
}
