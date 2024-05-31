import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useYourPhotos from "../../globalState/useYourPhotos";
import DroppableBox from "../dependent/DroppableBox";
import useActiveFrame from "../../globalState/useActiveFrame";
import frameList from "../../constant/frameList";

const PhotoGrid = () => {
  const { yourPhotos } = useYourPhotos();
  const [box1, setBox1] = useState<any | null>(yourPhotos[0]?.url || null);
  const [box2, setBox2] = useState<any | null>(yourPhotos[1]?.url || null);
  const [box3, setBox3] = useState<any | null>(yourPhotos[2]?.url || null);
  const [box4, setBox4] = useState<any | null>(yourPhotos[3]?.url || null);
  const [box5, setBox5] = useState<any | null>(yourPhotos[4]?.url || null);
  const [box6, setBox6] = useState<any | null>(yourPhotos[5]?.url || null);
  const [box7, setBox7] = useState<any | null>(yourPhotos[6]?.url || null);
  const [box8, setBox8] = useState<any | null>(yourPhotos[7]?.url || null);

  const handleDrop = (photoId: number, boxId: number) => {
    const photo = yourPhotos.find((p) => p.id === photoId);
    if (!photo) return;

    switch (boxId) {
      case 1:
        setBox1(photo.url);
        break;
      case 2:
        setBox2(photo.url);
        break;
      case 3:
        setBox3(photo.url);
        break;
      case 4:
        setBox4(photo.url);
        break;
      case 5:
        setBox5(photo.url);
        break;
      case 6:
        setBox6(photo.url);
        break;
      case 7:
        setBox7(photo.url);
        break;
      case 8:
        setBox8(photo.url);
        break;
    }
  };

  const { activeFrame } = useActiveFrame();

  return (
    <VStack
      p={4}
      my={"auto"}
      align={"stretch"}
      overflow={"auto"}
      className="scrollY scrollX scrollYkotak scrollXkotak"
    >
      <Text
        fontSize={28}
        color={"white"}
        className="display"
        textAlign={"center"}
      >
        Drag and Drop your photos
      </Text>

      <HStack
        gap={0}
        flexShrink={0}
        w={"600px"}
        mx={"auto"}
        bg={"white"}
        aspectRatio={4 / 6}
        align={"stretch"}
        position={"relative"}
      >
        <Image
          src={`./images/frames/${frameList[activeFrame].bg}`}
          position={"absolute"}
          bottom={0}
          zIndex={2}
        />

        <VStack gap={6} w={"50%"} px={6} justify={"center"} zIndex={3}>
          <DroppableBox
            id={1}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box1}
          />

          <DroppableBox
            id={2}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box2}
          />

          <DroppableBox
            id={3}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box3}
          />

          <DroppableBox
            id={4}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box4}
          />
        </VStack>

        <VStack gap={6} w={"50%"} px={6} justify={"center"} zIndex={3}>
          <DroppableBox
            id={5}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box5}
          />

          <DroppableBox
            id={6}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box6}
          />

          <DroppableBox
            id={7}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box7}
          />

          <DroppableBox
            id={8}
            onDrop={(photoId, boxId) => {
              handleDrop(photoId, boxId);
            }}
            photoUrl={box8}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default PhotoGrid;
