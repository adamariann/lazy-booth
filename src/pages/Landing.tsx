import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Container from "../components/wrapper/Container";

export default function Landing() {
  return (
    <Container justify={"center"} p={8}>
      <VStack flex={1} justify={"center"}>
        <Image src="logo512.png" maxW={"300px"} />
        <Button
          w={"100%"}
          maxW={"300px"}
          h={"80px"}
          className="btn-ap clicky"
          mt={8}
          as={Link}
          to={"/payment"}
        >
          <Text fontSize={28}>Start</Text>
        </Button>
      </VStack>

      <HStack>
        <Text mt={"auto"}>Powererd by</Text>
        <Image src="./logos/snapchat.png" h={6} />
      </HStack>
    </Container>
  );
}
