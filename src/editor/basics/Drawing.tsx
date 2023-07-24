import { useTransformer } from "@/hooks/editor/useTransformer";
import { clearSelectedId, updateSelectedId } from "@/store/editor";
import { updateMetaData } from "@/store/photo";
import { LayerObject, LayerType } from "@/types/editor";
import React, { useCallback, useMemo } from "react";
import { Image, Layer, Rect } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import RectPlus from "../components/RectPlus";
import ImagePlus from "../components/ImagePlus";

function Drawing() {
  const transformerContext = useTransformer();
  const selectedId = useSelector((state: any) => state.editor.selectedId);
  const dispatch = useDispatch();
  const photoData = useSelector((state: any) => state.photo);
  const boardConfig = useSelector((state: any) => state.editor.board);
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
      const newWidth = e.target.width() * e.target.scaleX();
      const newHeight = e.target.height() * e.target.scaleY();
      dispatch(
        updateMetaData({
          id: e.target.id(),
          x: e.target.x(),
          y: e.target.y(),
          width: Math.abs(newWidth),
          height: Math.abs(newHeight),
          rotation: e.target.rotation(),
        })
      );
      e.target.scaleX(newWidth < 0 ? -1 : 1);
      e.target.scaleY(newHeight < 0 ? -1 : 1);
      // e.target.cache();
      // e.target.getLayer().batchDraw();
    }
  };
  const renderDrawing = (data: LayerObject) => {
    switch (data.type) {
      case LayerType.Rect:
        return (
          <RectPlus
            data={data}
            key={data.id}
            handleTransformBegin={handleTransformBegin}
            handleTransformEnd={handleTransformEnd}
          />
        );
      case LayerType.Image:
        return (
          <ImagePlus
            data={data}
            key={data.id}
            handleTransformBegin={handleTransformBegin}
            handleTransformEnd={handleTransformEnd}
          />
        );
    }
  };
  return (
    <Layer
      x={boardConfig.offsetX}
      y={boardConfig.offsetY}
      scaleX={boardConfig.scale}
      scaleY={boardConfig.scale}
    >
      {photoData.metadata.map((item: LayerObject) => renderDrawing(item))}
    </Layer>
  );
}

export default Drawing;
