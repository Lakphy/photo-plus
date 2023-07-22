import React, { useEffect, useRef } from "react";
import editorbg from "../../assets/editorbg.svg";
import { Layer, Rect } from "react-konva";
import Konva from "konva";
import { useWindowSize } from "../../hooks/useWindowSize";

function Background() {
  const chessBoardRef = useRef<Konva.Rect>(null);
  const windowSize = useWindowSize();
  function loadBackground() {
    const chessBoardImage = new window.Image();
    chessBoardImage.src = editorbg;
    chessBoardImage.onload = () => {
      if (chessBoardRef.current) {
        chessBoardRef.current.fillPatternImage(chessBoardImage);
        chessBoardRef.current.fillPatternRepeat("repeat");
        chessBoardRef.current.fillPatternScale({ x: 0.5, y: 0.5 });
        chessBoardRef.current?.cache();
        chessBoardRef.current?.getLayer()?.batchDraw();
      }
    };
  }
  useEffect(() => {
    loadBackground();
  }, []);
  return (
    <Layer width={window.innerWidth} height={window.innerHeight}>
      <Rect
        ref={chessBoardRef}
        fill="black"
        fillPriority={"pattern"}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Layer>
  );
}

export default Background;
