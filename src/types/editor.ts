import { CircleLayer } from "./circle";
import { RectLayer } from "./rect";

export enum LayerType {
  Rect = "rect",
  Circle = "circle",
}

export type LayerObject = RectLayer | CircleLayer;

export interface BasicLayer {
  id: string;
  name: string;
  type: LayerType;
  x: number;
  y: number;
  rotation: number;
}

export interface PhotoData {
  id: string;
  name: string;
  width: number;
  height: number;
  metadata: LayerObject[];
}
