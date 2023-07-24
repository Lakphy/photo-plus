import { Image } from "react-konva";
import React, { useCallback, useEffect, useRef } from "react";
import { ImageLayer } from "@/types/image";
import Konva from "konva";
import { useSelector } from "react-redux";
import { useTransformer } from "@/hooks/editor/useTransformer";

interface ImagePlusProps {
  data: ImageLayer;
  handleTransformBegin: (e: any) => void;
  handleTransformEnd: (e: any) => void;
}

export default function ImagePlus(props: ImagePlusProps) {
  const { data, handleTransformBegin, handleTransformEnd } = props;
  const imgRef = useRef<HTMLImageElement>(document.createElement("img"));
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
  }, [transformer, isSelected]);
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
  useEffect(() => {
    if (!meta || meta.src === imgRef.current.src) return;
    imgRef.current.src = meta.src;
    imgRef.current.onload = () => {
      selfRef.current?.image(imgRef.current);
      selfRef.current?.cache();
      selfRef.current?.getLayer()?.batchDraw();
    };
  }, [meta]);
  return (
    <Image
      ref={selfRef}
      width={meta?.width || data.width}
      height={meta?.height || data.height}
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
      fill={"grey"}
      image={imgRef.current}
    />
  );
}
