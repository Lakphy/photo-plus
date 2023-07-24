import { CircleLayer } from "./circle";
import { ImageLayer } from "./image";
import { RectLayer } from "./rect";

export enum LayerType {
  Rect = "rect",
  Circle = "circle",
  Image = "image",
}

export type LayerObject = RectLayer | CircleLayer | ImageLayer;

export interface BasicLayer {
  id: string;
  name: string;
  type: LayerType;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  scaleX: 1 | -1;
  scaleY: 1 | -1;
}

export interface PhotoData {
  id: string;
  name: string;
  width: number;
  height: number;
  metadata: LayerObject[];
}
