import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import useYourPhotos from "../../globalState/useYourPhotos";
import DroppableBox from "../dependent/DroppableBox";

const PhotoGrid: React.FC = () => {
  const { yourPhotos } = useYourPhotos();
  const [box1, setBox1] = useState<any | null>(null);
  const [box2, setBox2] = useState<any | null>(null);
  const [box3, setBox3] = useState<any | null>(null);
  const [box4, setBox4] = useState<any | null>(null);
  const [box5, setBox5] = useState<any | null>(null);
  const [box6, setBox6] = useState<any | null>(null);

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
    }
  };

  return (
    <VStack
      justify={"center"}
      p={4}
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
      <SimpleGrid flexShrink={0} columns={2} gap={4} w={"600px"} mx={"auto"}>
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
      </SimpleGrid>
    </VStack>
  );
};

export default PhotoGrid;
