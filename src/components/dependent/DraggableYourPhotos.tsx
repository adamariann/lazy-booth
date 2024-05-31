import { Center, Text, VStack } from "@chakra-ui/react";
import useYourPhotos from "../../globalState/useYourPhotos";
import DraggablePhoto from "./DraggablePhoto";

export default function DraggableYourPhotos() {
  const { yourPhotos } = useYourPhotos();

  return (
    <VStack w={"250px"} align={"stretch"} overflowY={"auto"} gap={0}>
      <Center p={4} bg={"#191919"} zIndex={2}>
        <Text fontSize={32} className="display" color={"white"}>
          Your Photos
        </Text>
      </Center>

      <VStack
        align={"center"}
        px={4}
        pb={4}
        overflowY={"auto"}
        className="scrollY scrollYkotak"
      >
        {yourPhotos.map((photo, i) => {
          if (photo === null) {
            return (
              <Center
                key={i}
                p={4}
                bg={"var(--divider)"}
                w={"100%"}
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
            return <DraggablePhoto key={i} id={photo.id} url={photo.url} />;
          }
        })}
      </VStack>
    </VStack>
  );
}
