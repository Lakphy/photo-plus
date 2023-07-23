import { useTransformer } from "@/hooks/editor/useTransformer";
import { clearSelectedId, updateSelectedId } from "@/store/editor";
import { updateMetaData } from "@/store/photo";
import { LayerObject, LayerType } from "@/types/editor";
import React, { useCallback, useMemo } from "react";
import { Layer, Rect } from "react-konva";
import { useDispatch, useSelector } from "react-redux";

function Drawing() {
  const transformerContext = useTransformer();
  const selectedId = useSelector((state: any) => state.editor.selectedId);
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
  const handleTransformBegin = (e: any) => {};
  const handleTransformEnd = (e: any) => {
    if (findValidObject(e.target.id())) {
      dispatch(
        updateMetaData({
          id: e.target.id(),
          x: e.target.x(),
          y: e.target.y(),
          width: e.target.width() * e.target.scaleX(),
          height: e.target.height() * e.target.scaleY(),
          rotation: e.target.rotation(),
        })
      );
      e.target.scaleX(1);
      e.target.scaleY(1);
      // e.target.cache();
      // e.target.getLayer().batchDraw();
    }
  };
  const renderDrawing = (data: LayerObject) => {
    switch (data.type) {
      case LayerType.Rect:
        return (
          <Rect
            width={data.width}
            height={data.height}
            fill={data.backgroundColor}
            x={data.x}
            y={data.y}
            id={data.id}
            rotation={data.rotation}
            key={data.id}
            scaleX={1}
            scaleY={1}
            draggable
            onTransformStart={handleTransformBegin}
            onTransformEnd={handleTransformEnd}
          ></Rect>
        );
    }
  };
  return (
    <Layer>
      {photoData.metadata.map((item: LayerObject) => renderDrawing(item))}
    </Layer>
  );
}

export default Drawing;
