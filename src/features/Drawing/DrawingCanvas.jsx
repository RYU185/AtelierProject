import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { SketchPicker } from "react-color";
import styled from "styled-components";
import Header from '../Header';

// 스타일링 정의
const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CanvasWrapper = styled.div`
  width: 1800px;
  height: 700px;
  overflow: hidden;
  border-radius: 30px; /* 둥근 모서리 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
`;

const Tools = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;

const RangeInput = styled.input`
  width: 200px;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 10px;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #3730a3;
  }
`;

const ColorPickerButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 8px;
  background-color: #14b8a6;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0f766e;
  }
`;

const PickerPopup = styled.div`
  margin-top: 15px;
  z-index: 10;
  position: absolute;
  transform: translateY(50px);
`;

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [pickerVisible, setPickerVisible] = useState(false); // 컬러피커 보이기/숨기기 상태 관리

  const handleExport = () => {
    canvasRef.current
      .exportImage("png")
      .then((data) => {
        const link = document.createElement("a");
        link.href = data;
        link.download = "my-drawing.png";
        link.click();
      })
      .catch((e) => console.error(e));
  };

  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <CanvasContainer>
      <Header />
      <CanvasWrapper>
        <ReactSketchCanvas
          ref={canvasRef}
          width="1800px"
          height="700px"
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          canvasColor="#FFFFFF"
        />
      </CanvasWrapper>

      <Tools>
        {/* 기존 색상 선택 */}
        <ColorPickerWrapper>
          {[
            "#000000",
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
          ].map((color) => (
            <ColorCircle
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => setStrokeColor(color)}
            />
          ))}

          {/* 컬러피커 아이콘 버튼 추가 */}
          <ColorPickerButton onClick={() => setPickerVisible(!pickerVisible)}>
            🎨 색상선택
          </ColorPickerButton>
        </ColorPickerWrapper>

        {/* 컬러피커 컴포넌트 */}
        {pickerVisible && (
          <PickerPopup>
            <SketchPicker
              color={strokeColor}
              onChangeComplete={(color) => setStrokeColor(color.hex)}
            />
          </PickerPopup>
        )}

        {/* 브러쉬 크기 조정 */}
        <RangeInput
          type="range"
          min="1"
          max="50"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />

        {/* 저장 및 지우기 버튼 */}
        <ButtonWrapper>
          <Button onClick={handleExport}>다운로드</Button>
          <Button onClick={handleClear}>전체 지우기</Button>
        </ButtonWrapper>
      </Tools>
    </CanvasContainer>
  );
};

export default DrawingCanvas;
