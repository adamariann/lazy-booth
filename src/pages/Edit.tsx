import { HStack, VStack } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CountDown from "../components/dependent/CountDown";
import DraggableYourPhotos from "../components/dependent/DraggableYourPhotos";
import FilterList from "../components/dependent/FilterList";
import PhotoGrid from "../components/independent/PhotoGrid";
import isTouchDevice from "../lib/isTouchDevice";
import { TouchBackend } from "react-dnd-touch-backend";

export default function Edit() {
  const initialTime = 40; // 40 seconds
  const isTouch = isTouchDevice();
  const backend = isTouch ? TouchBackend : HTML5Backend;

  function onEditFinished() {
    //TODO ono edit finished func
  }

  return (
    <DndProvider backend={backend}>
      <HStack
        h={"100vh"}
        overflow={"hidden"}
        align={"stretch"}
        gap={0}
        bg={"#191919"}
      >
        <DraggableYourPhotos />

        <VStack
          flex={1}
          bgImage={"./images/texture.png"}
          bgSize={"cover"}
          bgPos={"center"}
          align={"stretch"}
          overflow={"auto"}
          className="scrollY scrollX scrollYkotak scrollXkotak"
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

          <PhotoGrid />
        </VStack>

        <FilterList />
      </HStack>
    </DndProvider>
  );
}
