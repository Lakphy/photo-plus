import { updateBoard } from "@/store/editor";
import Konva from "konva";
import { RefObject, useEffect } from "react";
import { useDispatch } from "react-redux";

export function useMiddleMouseDrag(nodeRef: RefObject<Konva.Node>) {
  const dispatch = useDispatch();
  useEffect(() => {
    nodeRef.current?.on("mousedown", (e) => {
      if (e.evt.button === 1) {
        nodeRef.current?.startDrag();
      }
    });
    nodeRef.current?.on("mouseup", (e) => {
      if (e.evt.button === 1) {
        nodeRef.current?.stopDrag();
        dispatch(
          updateBoard({
            offsetX: nodeRef.current?.getLayer()?.x(),
            offsetY: nodeRef.current?.getLayer()?.y(),
          })
        );
      }
    });
  }, [nodeRef]);
}
