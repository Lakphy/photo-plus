import React, { useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Background from "./basics/Background";
import Konva from "konva";
import { useResize } from "@/hooks/useResize";
import DrawingBoard from "./basics/DrawingBoard";
import Drawing from "./basics/Drawing";

function Editor() {
  const StageRef = useRef<Konva.Stage>(null);
  useResize((width: number, height: number) => {
    if (StageRef.current) {
      StageRef.current.width(width);
      StageRef.current.height(height);
    }
  });
  return (
    <div>
      <Stage
        ref={StageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Background />
        <DrawingBoard />
        <Drawing />
      </Stage>
    </div>
  );
}

export default Editor;
