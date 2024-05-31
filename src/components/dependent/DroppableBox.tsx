import { Center, Image, Text } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

interface Props {
  id: number;
  onDrop: (photoId: number, boxId: number) => void;
  photoUrl: string | null;
}

const DroppableBox = ({ id, onDrop, photoUrl }: Props) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "photo",
    drop: (item: { id: number }) => onDrop(item.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Center
      ref={drop}
      aspectRatio={3 / 2}
      transition={"200ms"}
      bg={isOver ? "p.500" : "white"}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`Box ${id}`}
          w={"100%"}
          aspectRatio={3 / 2}
          objectFit={"cover"}
          opacity={isOver ? 0 : 1}
        />
      ) : (
        <Text className="display" fontSize={28} opacity={0.2}>
          Drop Here
        </Text>
      )}
    </Center>
  );
};

export default DroppableBox;
