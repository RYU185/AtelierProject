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
  transition: transform 10s ease;
  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

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
