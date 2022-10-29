import { useEffect, useRef, useState } from "react";

export type UseMouseState = {
  x: number;
  y: number;
};

export const useMouse = () => {
  const frame = useRef(0);

  const [mouse, setMouse] = useState<UseMouseState>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        setMouse({
          x: event.pageX,
          y: event.pageY,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mouse;
};
