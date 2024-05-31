import {
  Center,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RiBardFill } from "@remixicon/react";
import useFilterList from "../../globalState/useFilterList";
import useCameraSession from "../../globalState/useCameraSession";
import { Lens } from "@snap/camera-kit/.";

export default function FilterList() {
  const { filterList } = useFilterList();
  const { cameraSession } = useCameraSession();

  return (
    <VStack w={250} align={"stretch"} overflowY={"auto"} gap={0}>
      <Center p={4} bg={"#191919"} zIndex={2}>
        <HStack color={"white"}>
          <Icon as={RiBardFill} fontSize={24} />
          <Text fontSize={32} className="display">
            Filters
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
          {filterList?.map((d: Lens, i: number) => {
            // console.log(d);
            const ok = i > 0;

            return (
              ok && (
                <Tooltip label={d.name} placement="top">
                  <VStack
                    key={i}
                    color={"white"}
                    bg={"var(--divider)"}
                    p={4}
                    cursor={"pointer"}
                    className="clicky"
                    onClick={() => {
                      if (cameraSession) {
                        cameraSession.applyLens(d);
                      } else {
                        console.log("titit");
                      }
                    }}
                  >
                    <Image flexShrink={1} src={d.iconUrl} />
                    <Text
                      textAlign={"center"}
                      fontWeight={500}
                      lineHeight={1.2}
                      mt={2}
                      fontSize={14}
                      opacity={0.6}
                      noOfLines={1}
                    >
                      {d.name}
                    </Text>
                  </VStack>
                </Tooltip>
              )
            );
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}
