import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "../components/tes/Draggable";
import Droppable from "../components/tes/Droppable";

export default function Tes() {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}

      <Droppable id="droppable">
        {parent === "droppable" ? draggable : "Drop here"}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }: any) {
    setParent(over ? over.id : null);
  }
}
