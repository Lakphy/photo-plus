import { LayerObject, LayerType } from "@/types/editor";
import React from "react";
import { Layer, Rect } from "react-konva";
import { useSelector } from "react-redux";

function Drawing() {
  const photoData = useSelector((state: any) => state.photo);
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
            onClick={(e) => {
              console.log("click", e);
            }}
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
