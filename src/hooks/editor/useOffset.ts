import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../useWindowSize";
import { updateBoard, updateMinScale, zoomBoard } from "@/store/editor";
import { useResize } from "../useResize";

export function useOffset() {
  const dispatch = useDispatch();
  const { width: boardWidth, height: boardHeight } = useSelector(
    (state: any) => state.photo
  );
  const {
    left: siderLeft,
    top: siderTop,
    right: siderRight,
    bottom: siderBottom,
  } = useSelector((state: any) => state.editor.sider);
  const { offsetX, offsetY, scale } = useSelector(
    (state: any) => state.editor.board
  );

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // 安全区域宽度
  const safeWidth = useMemo(
    () => windowWidth - siderLeft - siderRight,
    [siderLeft, siderRight, windowWidth]
  );
  // 安全区域高度
  const safeHeight = useMemo(
    () => windowHeight - siderTop - siderBottom,
    [siderBottom, siderTop, windowHeight]
  );
  // 初始缩放比例
  const initialScale = useMemo(() => {
    if (boardWidth / boardHeight > safeWidth / safeHeight) {
      return safeWidth / boardWidth;
    } else return safeHeight / boardHeight;
  }, [boardHeight, boardWidth, safeHeight, safeWidth]);
  // 初始画板宽度
  const initialBoardWidth = useMemo(
    () => boardWidth * initialScale,
    [boardWidth, initialScale]
  );
  // 初始画板高度
  const initialBoardHeight = useMemo(
    () => boardHeight * initialScale,
    [boardHeight, initialScale]
  );
  const minScale = useMemo(() => initialScale / 10, [initialScale]);

  const handleWheel = (e: any) => {
    if (e.evt.buttons !== 0) return;
    handleZoom(e.evt.deltaY, e.evt.x, e.evt.y);
  };

  const handleZoom = (deltaY: number, x?: number, y?: number) => {
    if (x && y) dispatch(zoomBoard({ delta: deltaY / -1000, x, y }));
    else
      dispatch(
        zoomBoard({
          delta: deltaY / -1000,
          x: windowWidth / 2,
          y: windowHeight / 2,
        })
      );
  };

  const resetPosition = useCallback(() => {
    dispatch(
      updateBoard({
        scale: initialScale,
        offsetX: (safeWidth - initialScale * boardWidth) / 2 + siderLeft,
        offsetY: (safeHeight - initialScale * boardHeight) / 2 + siderTop,
      })
    );
  }, [
    boardHeight,
    boardWidth,
    dispatch,
    initialScale,
    safeHeight,
    safeWidth,
    siderLeft,
    siderTop,
  ]);

  useEffect(() => {
    dispatch(updateMinScale(minScale));
  }, [minScale]);

  useEffect(resetPosition, [windowWidth, windowHeight]);

  return { handleWheel, handleZoom, resetPosition };
}
