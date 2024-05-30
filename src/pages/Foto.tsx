import { HStack, Text, VStack } from "@chakra-ui/react";
import formatDurationNumeric from "../lib/FormatDurationNumeric";

export default function Foto() {
  const initialTime = 60; // seconds

  return (
    <HStack
      h={"100vh"}
      overflow={"hidden"}
      align={"stretch"}
      gap={0}
      bg={"#191919"}
    >
      <VStack w={"300px"} border={"1px solid red"}></VStack>

      <VStack
        flex={1}
        border={"1px solid green"}
        bgImage={"./images/texture.png"}
        bgSize={"cover"}
        bgPos={"center"}
      >
        <Text>{formatDurationNumeric(initialTime)}</Text>
      </VStack>

      <VStack w={"300px"} border={"1px solid blue"}></VStack>
    </HStack>
  );
}
