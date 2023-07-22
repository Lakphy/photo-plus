import React, { useMemo, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Background from "./basics/Background";
import Konva from "konva";
import { useResize } from "@/hooks/useResize";
import DrawingBoard from "./basics/DrawingBoard";
import Drawing from "./basics/Drawing";
import {
  transformerContext,
  useTransformer,
} from "@/hooks/editor/useTransformer";
import { updateSelectedId } from "@/store/editor";
import { useDispatch, useSelector } from "react-redux";
import { LayerObject } from "@/types/editor";

function Editor() {
  const StageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useDispatch();
  const photoData = useSelector((state: any) => state.photo);
  const photoMetadata = useSelector((state: any) => state.photo.metadata);
  const photoMetaId: string[] = useMemo(
    () => photoMetadata.map((item: LayerObject) => item.id),
    [photoMetadata]
  );
  const findValidObject = (id: string) => {
    return photoMetaId.find((item: string) => item === id);
  };
  useResize((width: number, height: number) => {
    if (StageRef.current) {
      StageRef.current.width(width);
      StageRef.current.height(height);
    }
  });
  return (
    <div>
      <transformerContext.Provider value={transformerRef}>
        <Stage
          ref={StageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={(e) => {
            if (!findValidObject(e.target.id())) return;
            transformerRef.current?.nodes([e.target]);
            dispatch(updateSelectedId(e.target.id()));
          }}
          onDragStart={(e) => {
            if (!findValidObject(e.target.id())) return;
            transformerRef.current?.nodes([e.target]);
            dispatch(updateSelectedId(e.target.id()));
          }}
          onTransformEnd={(e) => {
            if (!findValidObject(e.target.id())) return;
            console.log("onTransformEnd", e);
          }}
        >
          <Background />
          <DrawingBoard />
          <Drawing />
          <Layer>
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </transformerContext.Provider>
    </div>
  );
}

export default Editor;
