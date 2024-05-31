import { Center, Image, Text, VStack } from "@chakra-ui/react";
import useYourPhotos from "../../globalState/useYourPhotos";

export default function YourPhotos() {
  const { yourPhotos } = useYourPhotos();

  return (
    <VStack w={"300px"} align={"stretch"} overflowY={"auto"} gap={0}>
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
        {yourPhotos.map((d, i) => {
          if (d === null) {
            return (
              <Center
                key={i}
                p={4}
                bg={"var(--divider)"}
                h={"150px"}
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
              <Center key={i} h={"150px"} flexShrink={0}>
                <Image h={"100%"} src={d} objectFit={"cover"} />
              </Center>
            );
          }
        })}
      </VStack>
    </VStack>
  );
}
