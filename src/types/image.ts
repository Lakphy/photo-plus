import { BasicLayer, LayerType } from "./editor";

export interface ImageLayer extends BasicLayer {
  type: LayerType.Image;
  width: number;
  height: number;
  src: string;
}
