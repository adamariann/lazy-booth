import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Container from "../components/wrapper/Container";
import { Link } from "react-router-dom";
import CountDown from "../components/dependent/CountDown";

export default function Payment() {
  function refreshQr() {
    console.log("refresh qr tod");
    //TODO func refresh qr
  }

  return (
    <Container justify={"center"} p={8}>
      <VStack
        flex={1}
        justify={"center"}
        gap={0}
        align={"stretch"}
        overflow={"clip"}
        mb={6}
      >
        <VStack
          p={4}
          position={"relative"}
          borderBottom={"2px dashed white"}
          bg={"p.500"}
          // borderRadius={"16px 16px 0 0"}
        >
          <Box
            borderRadius={"full"}
            w={"20px"}
            h={"20px"}
            bg={"white"}
            position={"absolute"}
            left={"-10px"}
            bottom={"-10px"}
          />
          <Box
            borderRadius={"full"}
            w={"20px"}
            h={"20px"}
            bg={"white"}
            position={"absolute"}
            right={"-10px"}
            bottom={"-10px"}
          />
          <Text color={"white"} fontSize={28} fontWeight={600}>
            Payment
          </Text>
        </VStack>

        <VStack
          p={6}
          bg={"p.500"}
          gap={0}
          // borderRadius={"0 0  16px 16px"}
        >
          <Image boxSize={"300px"} src="./images/qr.png" maxW={"300px"} />

          <Button
            mt={6}
            as={Link}
            to={"/foto"}
            className="clicky"
            colorScheme="wnb"
            size={"lg"}
            w={"100%"}
            color={"p.500"}
          >
            Confirm Your Payment
          </Button>
        </VStack>

        <Text mt={6} textAlign={"center"}>
          Kode QR akan kadaluarsa dalam
        </Text>
        <CountDown initialSeconds={60} onFinished={refreshQr} />
      </VStack>

      <Wrap spacingX={8} spacingY={4} mt={"auto"}>
        <WrapItem>
          <Image src="./logos/payments/qris.png" h={"40px"} />
        </WrapItem>
        <WrapItem>
          <Image src="./logos/payments/gopay.png" h={"40px"} />
        </WrapItem>
        <WrapItem>
          <Image src="./logos/payments/dana.png" h={"40px"} />
        </WrapItem>
        <WrapItem>
          <Image src="./logos/payments/ovo.png" h={"40px"} />
        </WrapItem>
        <WrapItem>
          <Image src="./logos/payments/shopeepay.png" h={"40px"} />
        </WrapItem>
      </Wrap>
    </Container>
  );
}
