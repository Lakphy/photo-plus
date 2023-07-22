import { BasicLayer, LayerType } from "./editor";

export interface CircleLayer extends BasicLayer {
  type: LayerType.Circle;
  width: number;
  height: number;
  backgroundColor?: string;
}
