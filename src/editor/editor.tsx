import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import Background from "./basics/Background";

function Editor() {
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Background />
      </Stage>
    </div>
  );
}

export default Editor;
