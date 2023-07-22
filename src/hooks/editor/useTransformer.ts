import Konva from "konva";
import React, { RefObject, useContext, useRef } from "react";

export const transformerContext =
  React.createContext<RefObject<Konva.Transformer> | null>(null);

export function useTransformer() {
  const _transformerContext = useContext(transformerContext);
  return _transformerContext;
}
