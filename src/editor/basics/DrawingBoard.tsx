import React, { useEffect, useRef } from "react";
import editorbg from "@/assets/editorbg.svg";
import { Layer, Rect } from "react-konva";
import Konva from "konva";
import { PhotoData } from "@/types/editor";
import { useSelector } from "react-redux";

function DrawingBoard() {
  const backgroundRef = useRef<Konva.Layer>(null);
  const chessBoardRef = useRef<Konva.Rect>(null);
  const backRectRef = useRef<Konva.Rect>(null);
  const photoData = useSelector((state: { photo: PhotoData }) => state.photo);
  const boardConfig = useSelector((state: any) => state.editor.board);
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
  useEffect(() => {
    if (backRectRef.current) {
      backRectRef.current.width(photoData.height);
      backRectRef.current.height(photoData.height);
      backRectRef.current?.cache();
      backRectRef.current?.getLayer()?.batchDraw();
    }
  }, [photoData.height, photoData.width]);
  return (
    <Layer
      ref={backgroundRef}
      x={boardConfig.offsetX}
      y={boardConfig.offsetY}
      scaleX={boardConfig.scale}
      scaleY={boardConfig.scale}
    >
      <Rect
        ref={backRectRef}
        fill="white"
        width={photoData.height}
        height={photoData.height}
      />
      <Rect
        ref={chessBoardRef}
        fillPriority={"pattern"}
        width={photoData.height}
        height={photoData.height}
      />
    </Layer>
  );
}

export default DrawingBoard;
