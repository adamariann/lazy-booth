import { Button, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CameraScreen, {
  CameraScreenHandle,
} from "../components/dependent/CameraScreen";
import CountDown from "../components/dependent/CountDown";
import FilterList from "../components/dependent/FilterList";
import { useNavigate } from "react-router-dom";

export default function Foto() {
  // Photo session 80 second
  const initialTime = 5; // 5 seconds
  const [ready, setReady] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);
  const [data] = useState<any[]>([
    "./images/gear5.jpg",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [start, setStart] = useState<boolean>(false);
  const cameraScreenRef = useRef<CameraScreenHandle>(null);
  const handleCaptureImage = () => {
    if (cameraScreenRef.current) {
      cameraScreenRef.current.captureImage();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (counter === 8) {
      navigate("/edit");
    } else {
      setTimeout(() => {
        setReady(true);
      }, 5000);
    }
  }, [counter, navigate]);

  function onShutter() {
    setReady(false);
    setCounter(counter + 1);

    handleCaptureImage();
  }

  return (
    <HStack
      h={"100vh"}
      overflow={"hidden"}
      align={"stretch"}
      gap={0}
      bg={"#191919"}
    >
      <VStack w={250} align={"stretch"} overflowY={"auto"} gap={0}>
        <Center p={4} bg={"#191919"} zIndex={2}>
          <Text fontSize={32} className="display" color={"white"}>
            Your Photos
          </Text>
        </Center>

        <VStack
          align={"stretch"}
          px={4}
          pb={4}
          overflowY={"auto"}
          className="scrollY scrollYkotak"
        >
          {data.map((d, i) => {
            if (d === null) {
              return (
                <Center
                  key={i}
                  p={4}
                  bg={"var(--divider)"}
                  aspectRatio={3 / 2}
                  flexShrink={0}
                >
                  <Text
                    fontSize={52}
                    color={"white"}
                    opacity={0.2}
                    className="display"
                    fontWeight={600}
                  >
                    {i + 1}
                  </Text>
                </Center>
              );
            } else {
              return (
                <Center key={i} aspectRatio={3 / 2} flexShrink={0}>
                  <Image h={"100%"} src={d} objectFit={"cover"} />
                </Center>
              );
            }
          })}
        </VStack>
      </VStack>

      <VStack
        flex={1}
        bgImage={"./images/texture.png"}
        bgSize={"cover"}
        bgPos={"center"}
      >
        {!start && (
          <>
            <Text fontSize={52} className="display" color={"white"} my={2}>
              Camera Test
            </Text>
            <Text className="display" color={"white"} my={2} fontSize={20}>
              Click Start to start photo session
            </Text>
            <Button
              colorScheme="ap"
              className="btn-ap clicky"
              size={"lg"}
              w={"180px"}
              h={"80px"}
              onClick={() => {
                setStart(true);
              }}
            >
              <Text fontSize={20}>Start</Text>
            </Button>
          </>
        )}
        {start && !ready && (
          <Text fontSize={52} className="display" color={"white"} my={2}>
            {counter < 8 ? "Get Ready" : "Finished"}
          </Text>
        )}
        {start && ready && (
          <CountDown
            initialSeconds={initialTime}
            fontSize={52}
            color={"white"}
            className="display"
            onFinished={onShutter}
            format="second"
            my={2}
          />
        )}

        {/* Camera Screen */}
        <CameraScreen ref={cameraScreenRef} />
      </VStack>

      <FilterList />
    </HStack>
  );
}
