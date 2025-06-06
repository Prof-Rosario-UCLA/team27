import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import {
  Text,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";

const Markdown2React: Components = {
  h1: (props) => <Text as="h1" fontSize="2xl" fontWeight="bold" {...props} />,
  h2: (props) => (
    <Text as="h2" fontSize="xl" fontWeight="semibold" {...props} />
  ),
  h3: (props) => (
    <Text as="h3" fontSize="lg" fontWeight="semibold" {...props} />
  ),
  p: (props) => <Text as="p" mb="4" {...props} />,
  a: (props) => <Link color="blue.500" fontWeight="semibold" {...props} />,
  ul: (props) => <UnorderedList pl="4" {...props} />,
  ol: (props) => <OrderedList pl="4" {...props} />,
  li: (props) => <ListItem {...props} />,
  code: (props) => (
    <Code
      colorScheme="blackAlpha"
      borderRadius="md"
      p="1"
      fontSize="sm"
      maxWidth="100%"
      overflowX="auto"
      {...props}
    />
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown components={Markdown2React}>{content}</ReactMarkdown>;
}
