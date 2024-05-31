import { Image } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

interface Props {
  id: number;
  url: string;
}

const DraggablePhoto = ({ id, url }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "photo",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Image
      ref={drag}
      src={url}
      flexShrink={0}
      alt={`Photo ${id}`}
      aspectRatio={3 / 2}
      w={"100%"}
      opacity={isDragging ? 0.5 : 1}
      cursor={"move"}
      objectFit={"cover"}
    />
  );
};

export default DraggablePhoto;
