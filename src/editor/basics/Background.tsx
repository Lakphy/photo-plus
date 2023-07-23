import React, { useEffect, useRef } from "react";
import editorbg from "@/assets/editorbg.svg";
import { Layer, Rect } from "react-konva";
import Konva from "konva";
import { useResize } from "@/hooks/useResize";

function Background() {
  const backgroundRef = useRef<Konva.Layer>(null);
  const innerRectRef = useRef<Konva.Rect>(null);
  useResize((width: number, height: number) => {
    innerRectRef.current?.width(width);
    innerRectRef.current?.height(height);
    innerRectRef.current?.cache();
    innerRectRef.current?.getLayer()?.batchDraw();
  });
  return (
    <Layer ref={backgroundRef}>
      <Rect
        ref={innerRectRef}
        fill="black"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Layer>
  );
}

export default Background;
