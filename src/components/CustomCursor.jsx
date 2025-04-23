import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const CursorDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #0068ca;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.5s ease;
  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const location = useLocation();
  const hiddenRoutes= ["/drawingcanvas"]
  const isHidden = hiddenRoutes.includes(location.pathname);


  const cursorRef = useRef({ x: 0, y: 0 }); // 커서 위치
  const targetRef = useRef({ x: 0, y: 0 }); // 마우스의 도착위치

  useEffect(() => {
    const updateCursorPosition = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * 0.09;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * 0.09;

      // 커서 위치 업데이트
      const cursorDot = document.querySelector(".cursor-dot");
      if (cursorDot) {
        cursorDot.style.left = `${cursorRef.current.x}px`;
        cursorDot.style.top = `${cursorRef.current.y}px`;
      }

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return <CursorDot className="cursor-dot" hidden={isHidden} />;
};

export default CustomCursor;
