import React, { useCallback, useMemo, useRef } from "react";
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
import { clearSelectedId, updateSelectedId } from "@/store/editor";
import { useDispatch, useSelector } from "react-redux";
import { LayerObject } from "@/types/editor";
import { updateMetaData } from "@/store/photo";

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
  const findValidObject = useCallback(
    (id: string) => {
      return photoMetaId.find((item: string) => item === id);
    },
    [photoMetaId]
  );
  const handleClickObject = (e: any) => {
    if (!findValidObject(e.target.id())) {
      transformerRef.current?.nodes([]);
      dispatch(clearSelectedId());
    } else {
      transformerRef.current?.nodes([e.target]);
      dispatch(updateSelectedId(e.target.id()));
    }
  };
  const handleDragObjectBegin = (e: any) => {
    if (!findValidObject(e.target.id())) {
      transformerRef.current?.nodes([]);
      dispatch(clearSelectedId());
    } else {
      transformerRef.current?.nodes([e.target]);
      dispatch(updateSelectedId(e.target.id()));
    }
  };
  const handleDragObjectEnd = (e: any) => {
    if (findValidObject(e.target.id())) {
      dispatch(
        updateMetaData({
          id: e.target.id(),
          x: e.target.x(),
          y: e.target.y(),
        })
      );
    }
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
          onClick={handleClickObject}
          onDragStart={handleDragObjectBegin}
          onDragEnd={handleDragObjectEnd}
        >
          <Background />
          <DrawingBoard />
          <Drawing />
          <Layer>
            <Transformer
              ref={transformerRef}
              anchorCornerRadius={10}
              anchorFill={"rgb(0, 161, 255)"}
            />
          </Layer>
        </Stage>
      </transformerContext.Provider>
    </div>
  );
}

export default Editor;
