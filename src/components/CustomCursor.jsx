import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CursorDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #0068ca;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    const animateCursor = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.5,
        y: prev.y + (targetPosition.y - prev.y) * 0.5,
      }));
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [targetPosition]);

  return (
    <CursorDot
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
