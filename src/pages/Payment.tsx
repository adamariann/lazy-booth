import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountDown from "../components/dependent/CountDown";
import QRCodeGenerator from "../components/dependent/QRCodeGenerator";
import ComponentSpinner from "../components/independent/ComponentSpinner";
import Container from "../components/wrapper/Container";
import timeDifferenceWithNow from "../lib/timeDifferenceWithNow";

export default function Payment() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expiredTime, setExpiredTime] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    const url = `https://6fb0-125-166-3-155.ngrok-free.app/api/createpayment`;
    axios
      .get(url, { headers: { "ngrok-skip-browser-warning": "true" } })
      .then((r) => {
        if (r.status === 200) {
          setData(r.data.qr_string);
          setExpiredTime(timeDifferenceWithNow(r.data.expiry_time));
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY as string, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER as string,
      forceTLS: true,
      // encrypted: true,
    });
    const channel = pusher.subscribe("payment-status");
    console.log("channel", channel);
    channel.bind("payment.event", function (data: any) {
      console.log(data);
      if (data === "settlement") {
        alert("Pembayaran sukses!");
        // Redirect ke halaman selanjutnya
        window.location.href = "/foto";
      } else {
        alert("Pembayaran gagal!");
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  function refreshQr() {
    // window.location.reload();
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
          {loading && (
            <ComponentSpinner w={"300px"} minH={"300px"} color={"white"} />
          )}

          {!loading && data && (
            // <Image boxSize={"300px"} src="./images/qr.png" maxW={"300px"} />
            <QRCodeGenerator data={data} image={"/logo192.png"} />
          )}

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

        {expiredTime && (
          <>
            <Text mt={6} textAlign={"center"}>
              Kode QR akan kadaluarsa dalam
            </Text>

            <CountDown
              initialSeconds={expiredTime}
              onFinished={refreshQr}
              fontWeight={600}
            />
          </>
        )}
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
