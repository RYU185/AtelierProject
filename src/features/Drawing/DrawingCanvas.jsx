import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { SketchPicker } from "react-color"; // 컬러피커 추가



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
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <ReactSketchCanvas
          ref={canvasRef}
          width="1800px"
          height="700px"
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          canvasColor="#FFFFFF"
        />
      </div>

      <div className="tools">
        {/* 기존 색상 선택 */}
        <div className="color-picker">
          {[
            "#000000",
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
          ].map((color) => (
            <div
              key={color}
              className="color-circle"
              style={{ backgroundColor: color }}
              onClick={() => setStrokeColor(color)}
            />
          ))}

          {/* 컬러피커 아이콘 버튼 추가 */}
          <button
            className="color-picker-btn"
            onClick={() => setPickerVisible(!pickerVisible)}
          >
            🎨 색상선택
          </button>
        </div>

        {/* 컬러피커 컴포넌트 */}
        {pickerVisible && (
          <div className="picker-popup">
            <SketchPicker
              color={strokeColor}
              onChangeComplete={(color) => setStrokeColor(color.hex)}
            />
          </div>
        )}

        {/* 브러쉬 크기 조정 */}
        <input
          type="range"
          min="1"
          max="50"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />

        {/* 저장 및 지우기 버튼 */}
        <div className="buttons">
          <button onClick={handleExport}>다운로드</button>
          <button onClick={handleClear}>전체 지우기</button>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
