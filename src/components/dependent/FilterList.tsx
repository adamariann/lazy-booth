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
import useFilterList from "../../globalState/useFilterList";
import useCameraSession from "../../globalState/useCameraSession";

export default function FilterList() {
  const { filterList } = useFilterList();
  const { cameraSession } = useCameraSession();
  console.log(cameraSession);

  return (
    <VStack w={"300px"} align={"stretch"} overflowY={"auto"} gap={0}>
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
          {filterList?.map((d: any, i: number) => {
            return (
              <VStack
                key={i}
                color={"white"}
                bg={"var(--divider)"}
                p={4}
                cursor={"pointer"}
                className="clicky"
                onClick={() => {
                  cameraSession.applyLens(d);
                }}
              >
                <Image flexShrink={1} src={d.iconUrl} />
                <Text
                  textAlign={"center"}
                  fontWeight={500}
                  lineHeight={1.2}
                  mt={2}
                >
                  {d.name}
                </Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}
