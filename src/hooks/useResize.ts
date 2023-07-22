import React, { useEffect } from "react";

export function useResize(callback: Function) {
  useEffect(() => {
    const handleResize = (e: WindowEventMap["resize"]) => {
      callback(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}
