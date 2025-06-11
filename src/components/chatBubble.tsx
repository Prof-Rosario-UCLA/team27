import { Box } from "@chakra-ui/react";
import MarkdownRenderer from "@/features/library/components/markdown";

export default function ChatBubble({
  sender,
  message,
}: {
  sender: "user" | "agent";
  message: string;
}) {
  return (
    <Box
      borderRadius="xl"
      p="4"
      bgColor={sender == "user" ? "gray.300" : "gray.100"}
      mb="2"
      alignSelf={sender == "user" ? "flex-end" : "flex-start"}
      borderBottomRightRadius={sender == "user" ? "sm" : "xl"}
      borderBottomLeftRadius={sender == "agent" ? "sm" : "xl"}
    >
      <MarkdownRenderer content={message} />
    </Box>
  );
}
