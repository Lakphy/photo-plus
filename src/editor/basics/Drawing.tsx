import { useTransformer } from "@/hooks/editor/useTransformer";
import { updateSelectedId } from "@/store/editor";
import { LayerObject, LayerType } from "@/types/editor";
import React from "react";
import { Layer, Rect } from "react-konva";
import { useDispatch, useSelector } from "react-redux";

function Drawing() {
  const transformerContext = useTransformer();
  const photoData = useSelector((state: any) => state.photo);
  const selectedId = useSelector((state: any) => state.editor.selectedId);
  const dispatch = useDispatch();
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
            key={data.id}
            draggable
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
