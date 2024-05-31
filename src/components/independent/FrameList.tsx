import {
  Center,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiBardFill } from "@remixicon/react";
import frameList from "../../constant/frameList";
import useActiveFrame from "../../globalState/useActiveFrame";

export default function FrameList() {
  const { setActiveFrame } = useActiveFrame();

  return (
    <VStack w={250} align={"stretch"} overflowY={"auto"} gap={0}>
      <Center p={4} bg={"#191919"} zIndex={2}>
        <HStack color={"white"}>
          <Icon as={RiBardFill} fontSize={24} />
          <Text fontSize={32} className="display">
            Frames
          </Text>
        </HStack>
      </Center>

      <VStack
        align={"stretch"}
        px={4}
        pb={4}
        overflowY={"auto"}
        className="scrollY scrollYkotak"
      >
        <SimpleGrid columns={2} gap={4}>
          {frameList?.map((d, i) => {
            return (
              <VStack
                key={i}
                color={"white"}
                bg={"var(--divider)"}
                p={4}
                onClick={() => {
                  setActiveFrame(i);
                }}
                cursor={"pointer"}
                className="clicky"
              >
                <Image flexShrink={1} src={`./images/frames/${d.frame}`} />
              </VStack>
            );
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}
