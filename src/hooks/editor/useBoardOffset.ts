import { useSelector, useDispatch } from "react-redux";
import { useResize } from "@/hooks/useResize";
import { updateBoard } from "@/store/editor";
import { useMemo } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

function useBoardOffset() {
  const scale = useSelector((state: any) => state.editor.board.scale);
  const {
    left: siderLeft,
    top: siderTop,
    right: siderRight,
    bottom: siderBottom,
  } = useSelector((state: any) => state.editor.sider);

  const { width: photoWidth, height: photoHeight } = useSelector(
    (state: any) => ({
      width: state.photo.width,
      height: state.photo.height,
    })
  );
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const dispatch = useDispatch();
  const offsetX = useMemo(() => {}, [
    photoWidth,
    windowWidth,
    scale,
    siderLeft,
    siderRight,
  ]);
  const offsetY = useMemo(() => {}, [
    photoHeight,
    windowHeight,
    scale,
    siderTop,
    siderBottom,
  ]);
  return { offsetX, offsetY };
}
