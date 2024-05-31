import { Text, VStack } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <VStack
      ref={setNodeRef}
      style={style}
      aspectRatio={3 / 2}
      maxW={280}
      bg={"red"}
    >
      <Text>{props.children}</Text>
    </VStack>
  );
}
