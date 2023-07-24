import { sortMetaDataZIndex } from "@/store/photo";
import { useDispatch } from "react-redux";

export function useZIndex() {
  const dispatch = useDispatch();
  const formatZIndex = () => {
    dispatch(sortMetaDataZIndex());
  };
  const toUpperZIndex = (id: string) => {};
  const toLowerZIndex = (id: string) => {};
  const toTopZIndex = (id: string) => {};
  const toBottomZIndex = (id: string) => {};

  return {
    formatZIndex,
    toUpperZIndex,
    toLowerZIndex,
    toTopZIndex,
    toBottomZIndex,
  };
}
