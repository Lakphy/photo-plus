import { Rect } from "react-konva";
import React, { useCallback, useEffect, useRef } from "react";
import { RectLayer } from "@/types/rect";
import Konva from "konva";
import { useTransformer } from "@/hooks/editor/useTransformer";
import { useSelector } from "react-redux";

interface RectPlusProps {
  data: RectLayer;
  handleTransformBegin: (e: any) => void;
  handleTransformEnd: (e: any) => void;
}

export default function RectPlus(props: RectPlusProps) {
  const { data, handleTransformBegin, handleTransformEnd } = props;
  const selfRef = useRef<Konva.Image>(null);
  const transformer = useTransformer();
  const isSelected = useSelector((state: any) => {
    return state.editor.selectedId.find((item: string) => item === data.id);
  });
  const meta = useSelector((state: any) =>
    state.photo.metadata.find((item: any) => item.id === data.id)
  );
  const handleSelect = useCallback(() => {
    if (selfRef.current && isSelected) {
      transformer?.current?.nodes([selfRef.current]);
      selfRef.current?.cache();
      selfRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected, transformer]);
  useEffect(() => {
    handleSelect();
  }, [isSelected, transformer]);
  useEffect(() => {
    if (meta) {
      selfRef.current?.width(meta.width);
      selfRef.current?.height(meta.height);
      selfRef.current?.x(meta.x);
      selfRef.current?.y(meta.y);
      selfRef.current?.rotation(meta.rotation);
      selfRef.current?.scaleX(meta.scaleX);
      selfRef.current?.scaleY(meta.scaleY);
      selfRef.current?.cache();
      selfRef.current?.getLayer()?.batchDraw();
    }
  }, [meta]);
  return (
    <Rect
      ref={selfRef}
      width={meta?.width || data.width}
      height={meta?.height || data.height}
      fill={meta?.backgroundColor || data.backgroundColor}
      x={meta?.x || data.x}
      y={meta?.y || data.y}
      id={meta?.id || data.id}
      rotation={meta?.rotation || data.rotation}
      key={meta?.id || data.id}
      scaleX={meta?.scaleX || data.scaleX}
      scaleY={meta?.scaleY || data.scaleY}
      draggable
      onTransformStart={handleTransformBegin}
      onTransformEnd={handleTransformEnd}
    />
  );
}
