import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  overflow: hidden;
  position: relative;
  margin-top: 80px;
  background: #f5f5f5;
`;

const LeftToolBar = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 80px;
  height: calc(100vh - 80px);
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  z-index: 100;
`;

const ToolGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ToolIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "#444" : "transparent")};
  border-radius: 8px;
  transition: all 0.2s ease;

  img {
    width: 24px;
    height: 24px;
    filter: ${(props) =>
      props.selected ? "brightness(1.2)" : "brightness(1)"};
  }

  &:hover {
    background-color: #444;
  }
`;

const ColorPalette = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  padding: 10px;
`;

const ColorCircle = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: ${(props) => (props.selected ? "2px solid white" : "none")};
  margin: 0;
  background-color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    border: 2px solid white;
  }
`;

const CustomColorButton = styled(ColorCircle)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
  position: relative;
`;

const CustomColorInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const TopToolBar = styled.div`
  position: fixed;
  top: 90px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 15px;
  background: rgba(34, 34, 34, 0.9);
  padding: 10px;
  border-radius: 8px;
`;

const CanvasContainer = styled.div`
  margin-left: 80px;
  width: calc(100vw - 80px);
  height: calc(100vh - 80px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  position: relative;
`;

const CanvasWrapper = styled.div`
  position: relative;
  transform-origin: center;
`;

const Canvas = styled.canvas`
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => {
    if (props.isPanning) return "grab";
    switch (props.tool) {
      case "pencil":
        return 'url("@pencil-cursor.png") 0 24, auto';
      case "brush":
        return 'url("@brush-cursor.png") 0 24, auto';
      case "marker":
        return 'url("@marker-cursor.png") 0 24, auto';
      case "highlighter":
        return 'url("@highlighter-cursor.png") 0 24, auto';
      case "calligraphy":
        return 'url("@calligraphy-cursor.png") 0 24, auto';
      case "eraser":
        return 'url("@eraser-cursor.png") 0 24, auto';
      default:
        return "crosshair";
    }
  }};
`;

const SizeControlContainer = styled.div`
  position: absolute;
  left: 110px;
  top: 50%;
  transform: translateY(-50%);
  background: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const SliderInput = styled.input`
  width: 150px;
  margin: 0;
  -webkit-appearance: none;
  height: 4px;
  background: #444;
  border-radius: 4px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #2c2c2c;
  }
`;

const SizeValue = styled.div`
  color: white;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 90px;
  top: 0;
  background: #2c2c2c;
  border-radius: 8px;
  padding: 8px 0;
  min-width: 150px;
  display: ${(props) => (props.show ? "block" : "none")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [tool, setTool] = useState("pencil");
  const [history, setHistory] = useState([]);
  const [futureHistory, setFutureHistory] = useState([]);
  const [toolSizes, setToolSizes] = useState({
    pencil: 2,
    brush: 6,
    marker: 12,
    highlighter: 14,
    calligraphy: 6,
    eraser: 20,
  });
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showSizeControl, setShowSizeControl] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 캔버스 크기를 적절하게 조정
    canvas.width = 1920; // Full HD 크기로 변경
    canvas.height = 1080;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    contextRef.current = ctx;

    // 초기 위치만 중앙 정렬
    centerCanvas();
  }, []);

  const centerCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container || !canvas) return;

    const centerX = (container.clientWidth - canvas.width) / 2;
    const centerY = (container.clientHeight - canvas.height) / 2;
    setOffset({ x: centerX, y: centerY });
  };

  useEffect(() => {
    if (tool !== "eraser" && contextRef.current) {
      contextRef.current.strokeStyle = brushColor;
    }
  }, [brushColor]);

  const applyToolStyle = (toolName) => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = brushColor;
    ctx.globalAlpha = 1.0;

    switch (toolName) {
      case "pencil":
        ctx.lineWidth = toolSizes.pencil;
        break;
      case "brush":
        ctx.lineWidth = toolSizes.brush;
        ctx.globalAlpha = 0.6;
        break;
      case "marker":
        ctx.lineWidth = toolSizes.marker;
        break;
      case "highlighter":
        ctx.lineWidth = toolSizes.highlighter;
        ctx.globalAlpha = 0.3;
        break;
      case "calligraphy":
        ctx.lineWidth = toolSizes.calligraphy;
        ctx.globalAlpha = 0.8;
        break;
      case "eraser":
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = toolSizes.eraser;
        break;
      default:
        break;
    }
  };

  const handleSizeChange = (toolName, value) => {
    setToolSizes((prev) => ({
      ...prev,
      [toolName]: parseInt(value),
    }));
    applyToolStyle(toolName);
  };

  const selectTool = (toolName) => {
    setTool(toolName);
    setSelectedTool((prev) => (prev === toolName ? null : toolName));
    applyToolStyle(toolName);
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // 줌과 오프셋을 고려한 정확한 좌표 계산
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    return { x, y };
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) {
      // 휠 클릭
      e.preventDefault();
      setIsPanning(true);
      setStartPanPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    } else if (e.button === 0) {
      // 좌클릭
      const pos = getMousePos(e);
      contextRef.current.beginPath();
      contextRef.current.moveTo(pos.x, pos.y);
      setIsDrawing(true);
      applyToolStyle(tool);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      const newOffset = {
        x: e.clientX - startPanPosition.x,
        y: e.clientY - startPanPosition.y,
      };
      setOffset(newOffset);
    } else if (isDrawing) {
      const pos = getMousePos(e);
      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    }
  };

  const handleMouseUp = (e) => {
    if (isPanning) {
      setIsPanning(false);
    } else {
      stopDrawing();
    }
  };

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // 마우스 위치 (컨테이너 기준)
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 현재 마우스 위치의 캔버스 상의 좌표
      const canvasX = (mouseX - offset.x) / zoom;
      const canvasY = (mouseY - offset.y) / zoom;

      // 새로운 줌 계산
      const newZoom =
        e.deltaY > 0 ? Math.max(zoom * 0.9, 0.1) : Math.min(zoom * 1.1, 5);

      // 새로운 오프셋 계산 (마우스 포인터 위치 기준)
      const newOffset = {
        x: mouseX - canvasX * newZoom,
        y: mouseY - canvasY * newZoom,
      };

      setZoom(newZoom);
      setOffset(newOffset);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e) => handleWheel(e);
    container.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      container.removeEventListener("wheel", wheelHandler);
    };
  }, [zoom, offset]);

  const stopDrawing = () => {
    if (!isDrawing) return;

    contextRef.current.closePath();
    setIsDrawing(false);

    // Save the current state to history
    const snapshot = canvasRef.current.toDataURL();
    setHistory((prev) => [...prev, snapshot]);
    // Clear redo history when new drawing is made
    setFutureHistory([]);
  };

  const handleUndo = () => {
    if (history.length < 2) return;
    const ctx = contextRef.current;
    const image = new Image();
    const last = history[history.length - 2];
    const current = history[history.length - 1];

    setFutureHistory((prev) => [...prev, current]);

    image.src = last;
    image.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(image, 0, 0);
      setHistory((prev) => prev.slice(0, prev.length - 1));
    };
  };

  const handleRedo = () => {
    if (futureHistory.length === 0) return;
    const ctx = contextRef.current;
    const image = new Image();
    const next = futureHistory[futureHistory.length - 1];

    image.src = next;
    image.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(image, 0, 0);
      setHistory((prev) => [...prev, next]);
      setFutureHistory((prev) => prev.slice(0, prev.length - 1));
    };
  };

  const handleTempSave = () => {
    const image = canvasRef.current.toDataURL("image/png");
    localStorage.setItem("tempDrawing", image);
    alert("임시저장되었습니다!");
  };

  const handleDownload = () => {
    const image = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
  };

  const handleSave = () => {
    const image = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
  };

  const handleClear = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const handleColorSelect = (color) => {
    setBrushColor(color);
    setSelectedColor(color);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "new":
        handleClear();
        break;
      case "save":
        handleSave();
        break;
      case "download":
        handleDownload();
        break;
      case "tempSave":
        handleTempSave();
        break;
      default:
        break;
    }
    setShowMenu(false);
  };

  return (
    <>
      <Header />
      <Container>
        <LeftToolBar>
          <ToolGroup>
            <ToolIcon
              selected={tool === "pencil"}
              onClick={() => selectTool("pencil")}
            >
              <img src="/icons/pencil.png" alt="pencil" />
            </ToolIcon>
            <SizeControlContainer show={selectedTool === "pencil"}>
              <SliderInput
                type="range"
                min="1"
                max="50"
                value={toolSizes.pencil}
                onChange={(e) => handleSizeChange("pencil", e.target.value)}
              />
              <SizeValue>{toolSizes.pencil}px</SizeValue>
            </SizeControlContainer>
          </ToolGroup>

          <ToolGroup>
            <ToolIcon
              selected={tool === "brush"}
              onClick={() => selectTool("brush")}
            >
              <img src="/icons/brush.png" alt="brush" />
            </ToolIcon>
            <SizeControlContainer show={selectedTool === "brush"}>
              <SliderInput
                type="range"
                min="1"
                max="50"
                value={toolSizes.brush}
                onChange={(e) => handleSizeChange("brush", e.target.value)}
              />
              <SizeValue>{toolSizes.brush}px</SizeValue>
            </SizeControlContainer>
          </ToolGroup>

          <ToolGroup>
            <ToolIcon
              selected={tool === "marker"}
              onClick={() => selectTool("marker")}
            >
              <img src="/icons/marker.png" alt="marker" />
            </ToolIcon>
            <SizeControlContainer show={selectedTool === "marker"}>
              <SliderInput
                type="range"
                min="1"
                max="50"
                value={toolSizes.marker}
                onChange={(e) => handleSizeChange("marker", e.target.value)}
              />
              <SizeValue>{toolSizes.marker}px</SizeValue>
            </SizeControlContainer>
          </ToolGroup>

          <ToolGroup>
            <ToolIcon
              selected={tool === "highlighter"}
              onClick={() => selectTool("highlighter")}
            >
              <img src="/icons/highlighter.png" alt="highlighter" />
            </ToolIcon>
            <SizeControlContainer show={selectedTool === "highlighter"}>
              <SliderInput
                type="range"
                min="1"
                max="50"
                value={toolSizes.highlighter}
                onChange={(e) =>
                  handleSizeChange("highlighter", e.target.value)
                }
              />
              <SizeValue>{toolSizes.highlighter}px</SizeValue>
            </SizeControlContainer>
          </ToolGroup>

          <ToolGroup>
            <ToolIcon
              selected={tool === "calligraphy"}
              onClick={() => selectTool("calligraphy")}
            >
              <img src="/icons/calligraphy.png" alt="calligraphy" />
            </ToolIcon>
            <SizeControlContainer show={selectedTool === "calligraphy"}>
              <SliderInput
                type="range"
                min="1"
                max="50"
                value={toolSizes.calligraphy}
                onChange={(e) =>
                  handleSizeChange("calligraphy", e.target.value)
                }
              />
              <SizeValue>{toolSizes.calligraphy}px</SizeValue>
            </SizeControlContainer>
          </ToolGroup>

          <ToolGroup>
            <ToolIcon
              selected={tool === "eraser"}
              onClick={() => selectTool("eraser")}
            >
              <img src="/icons/eraser.png" alt="eraser" />
            </ToolIcon>
            <SizeControlContainer show={selectedTool === "eraser"}>
              <SliderInput
                type="range"
                min="1"
                max="50"
                value={toolSizes.eraser}
                onChange={(e) => handleSizeChange("eraser", e.target.value)}
              />
              <SizeValue>{toolSizes.eraser}px</SizeValue>
            </SizeControlContainer>
          </ToolGroup>
          <ToolGroup>
            <ToolIcon onClick={toggleMenu}>
              <img src="/icons/menu.png" alt="menu" />
            </ToolIcon>
            <DropdownMenu show={showMenu}>
              <MenuItem onClick={() => handleMenuItemClick("new")}>
                🗑️ 새로 만들기
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("save")}>
                💾 저장하기
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("download")}>
                📥 다운로드
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("tempSave")}>
                📝 임시 저장
              </MenuItem>
            </DropdownMenu>
          </ToolGroup>

          <ColorPalette>
            {[
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
              "#000000",
              "#ffffff",
            ].map((color) => (
              <ColorCircle
                key={color}
                color={color}
                selected={color === selectedColor}
                onClick={() => handleColorSelect(color)}
              />
            ))}
            <CustomColorButton>
              <CustomColorInput
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
              />
            </CustomColorButton>
          </ColorPalette>
        </LeftToolBar>
        <CanvasContainer ref={containerRef} onWheel={handleWheel}>
          <CanvasWrapper
            ref={canvasWrapperRef}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
              willChange: "transform",
            }}
          >
            <Canvas
              ref={canvasRef}
              tool={tool}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                cursor: isPanning ? "grabbing" : undefined,
              }}
            />
          </CanvasWrapper>
        </CanvasContainer>
      </Container>
    </>
  );
};

export default DrawingCanvas;
