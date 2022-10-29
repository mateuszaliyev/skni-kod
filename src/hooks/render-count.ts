import { useRef } from "react";

export const useRenderCount = () => {
  return ++useRef(0).current;
};
