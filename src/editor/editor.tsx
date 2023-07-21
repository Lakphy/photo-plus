import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import editorbg from "../assets/editorbg.svg";

function Editor() {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer width={window.innerWidth} height={window.innerHeight}>
          <Rect
            fill="red"
            fillPriority={"pattern"}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default Editor;
