import { HStack, VStack } from "@chakra-ui/react";
import CountDown from "../components/dependent/CountDown";
import FilterList from "../components/dependent/FilterList";
import YourPhotos from "../components/dependent/YourPhotos";

export default function Edit() {
  const initialTime = 40; // 40 seconds

  function onEditFinished() {
    //TODO ono edit finished func
  }

  return (
    <HStack
      h={"100vh"}
      overflow={"hidden"}
      align={"stretch"}
      gap={0}
      bg={"#191919"}
    >
      <YourPhotos />

      <VStack
        flex={1}
        bgImage={"./images/texture.png"}
        bgSize={"cover"}
        bgPos={"center"}
      >
        <CountDown
          initialSeconds={initialTime}
          fontSize={52}
          color={"white"}
          className="display"
          onFinished={onEditFinished}
          format="minute"
          my={2}
        />
      </VStack>

      <FilterList />
    </HStack>
  );
}
