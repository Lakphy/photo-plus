import { BasicLayer, LayerType } from "./editor";

export interface RectLayer extends BasicLayer {
  type: LayerType.Rect;
  width: number;
  height: number;
  backgroundColor?: string;
}
