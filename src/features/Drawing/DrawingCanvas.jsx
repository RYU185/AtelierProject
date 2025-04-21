import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  overflow: hidden;
  position: relative;
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

const Canvas = styled.canvas.attrs((props) => ({
  "data-tool": props.tool,
}))`
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: ${({ tool, isPanning }) => {
    if (isPanning) return "grab";
    switch (tool) {
      case "pencil":
        return 'url("/cursors/pencil-cursor.png") 0 24, auto';
      case "brush":
        return 'url("/cursors/brush-cursor.png") 0 24, auto';
      case "marker":
        return 'url("/cursors/marker-cursor.png") 0 24, auto';
      case "highlighter":
        return 'url("/cursors/highlighter-cursor.png") 0 24, auto';
      case "calligraphy":
        return 'url("/cursors/calligraphy-cursor.png") 0 24, auto';
      case "eraser":
        return 'url("/cursors/eraser-cursor.png") 0 24, auto';
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
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const SliderInput = styled.input`
  width: 150px;
  margin: 0;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* LeftToolBar 보다 높게 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px; /* 적절한 너비 */
`;

const ModalTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.confirm {
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  }

  &.cancel {
    background-color: #f0f0f0;
    color: #333;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [editId, setEditId] = useState(null);

  // State variables
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
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [drawingTitle, setDrawingTitle] = useState("");
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [isTemporarySave, setIsTemporarySave] = useState(false); // 임시 저장 여부 상태
  const [showDownloadNotice, setShowDownloadNotice] = useState(false);

  const handleConfirmDownload = () => {
    downloadImageAsJPEG();
    // 안내 문구 1.5초간 보여주고 → 제목 입력 모달 열기
    setShowDownloadNotice(true);

    setTimeout(() => {
      setShowDownloadNotice(false);
      setShowTitleModal(true);
    }, 3000);

    setShowSaveConfirmModal(false);
    // 다운로드 직후 잠깐 delay → 제목 모달 띄움
    setTimeout(() => {
      setShowTitleModal(true);
    }, 300); // 0.3초 후 실행
  };
  const downloadImageAsJPEG = () => {
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    const ctx = tempCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.href = tempCanvas.toDataURL("image/jpeg", 1.0);
    link.download = "drawing.jpg";
    link.click();
  };

  const fillCanvasWithWhiteBackground = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    fillCanvasWithWhiteBackground;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  };
  // Initialize canvas context and center canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = 1920;
    canvas.height = 1080;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    contextRef.current = ctx;

    centerCanvas();
  }, []);

  // Update stroke style when brush color changes (except for eraser)
  useEffect(() => {
    if (tool !== "eraser" && contextRef.current) {
      contextRef.current.strokeStyle = brushColor;
    }
  }, [brushColor, tool]);

  // Apply tool-specific styles
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

  // Handle tool size changes
  const handleSizeChange = (toolName, value) => {
    setToolSizes((prev) => ({ ...prev, [toolName]: parseInt(value) }));
    applyToolStyle(toolName);
  };

  // Select a drawing tool
  const selectTool = (toolName) => {
    setTool(toolName);
    setSelectedTool((prev) => (prev === toolName ? null : toolName));
    applyToolStyle(toolName);
  };

  // Get mouse position relative to the canvas, considering zoom and offset
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    return { x, y };
  };

  // Handle mouse down event
  const handleMouseDown = (e) => {
    if (e.button === 1) {
      e.preventDefault();
      setIsPanning(true);
      setStartPanPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    } else if (e.button === 0) {
      const pos = getMousePos(e);
      contextRef.current.beginPath();
      contextRef.current.moveTo(pos.x, pos.y);
      setIsDrawing(true);
      applyToolStyle(tool);
    }
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - startPanPosition.x,
        y: e.clientY - startPanPosition.y,
      });
    } else if (isDrawing) {
      const pos = getMousePos(e);
      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    }
  };

  // Handle mouse up and leave events to stop drawing/panning
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
    } else if (isDrawing) {
      stopDrawing();
    }
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      stopDrawing();
    }
    if (isPanning) {
      setIsPanning(false);
    }
  };

  // Stop drawing and save the drawing to history
  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    const snapshot = canvasRef.current.toDataURL();
    setHistory((prev) => [...prev, snapshot]);
    setFutureHistory([]); // Clear redo history on new drawing
  };

  // Handle canvas zooming
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      const canvasX = (mouseX - offset.x) / zoom;
      const canvasY = (mouseY - offset.y) / zoom;
      const newZoom =
        e.deltaY > 0 ? Math.max(zoom * 0.9, 0.1) : Math.min(zoom * 1.1, 5);
      setOffset({
        x: mouseX - canvasX * newZoom,
        y: mouseY - canvasY * newZoom,
      });
      setZoom(newZoom);
    }
  };

  // Center the canvas initially
  const centerCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container || !canvas) return;
    setOffset({
      x: (container.clientWidth - canvas.width) / 2,
      y: (container.clientHeight - canvas.height) / 2,
    });
  };

  // Undo the last drawing action

  // Clear the entire canvas
  const handleClear = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setHistory([]);
    setFutureHistory([]);
  };

  // Handle color selection from the palette
  const handleColorSelect = (color) => {
    setBrushColor(color);
    setSelectedColor(color);
  };

  // Toggle the dropdown menu for additional actions
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSaveClick = (isTemporary) => {
    setShowSaveConfirmModal(true);
    setIsTemporarySave(isTemporary); // 임시 저장 여부 상태 업데이트
  };

  const handleTitleChange = (e) => {
    setDrawingTitle(e.target.value);
  };

  const handleConfirmSave = async () => {
    if (drawingTitle.trim() === "") {
      alert("제목을 입력해주세요!");
      return;
    }

    await sendDrawingToServer(false, drawingTitle); // 서버 저장
    setShowTitleModal(false);
    setDrawingTitle("");
    navigate("/mypage", { state: { activeTab: "drawing" } });
  };

  const handleCancelSave = () => {
    setShowTitleModal(false);
    setDrawingTitle("");
    setIsTemporarySave(false); // 상태 초기화
  };

  const sendDrawingToServer = async (isTemporary, title) => {
    fillCanvasWithWhiteBackground();
    const imageData = canvasRef.current.toDataURL("image/png");

    if (!title || title.trim() === "") {
      alert("제목은 필수입니다!");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.post(
        "/api/realdrawing/save",
        {
          id: editId,
          imageData,
          isTemporary,
          title, // 제목 포함
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (isTemporary) {
        alert("📝 임시 저장 완료! 마이페이지로 이동합니다.");
        navigate("/mypage", { state: { activeTab: "drawing" } });
      } else {
        alert("💾 저장 완료! 마이페이지로로 이동합니다.");
        navigate("/mypage", { state: { activeTab: "drawing" } });
      }
    } catch (error) {
      console.error("❌ 저장 중 오류 발생:", error);
      alert("저장에 실패했습니다.");
    }
  };
  // Handle clicks on menu items
  const handleMenuItemClick = (action) => {
    switch (action) {
      case "new":
        handleClear();
        break;
      case "save":
        handleSaveClick(false); // 저장 클릭 시 모달 표시 (임시 저장 아님)
        break;
      case "tempSave":
        handleSaveClick(true); // 임시 저장 클릭 시 모달 표시
        break;
      default:
        break;
    }
    setShowMenu(false);
  };

  const loadImageToCanvas = (imageData) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // base64 prefix 중복 방지
    if (imageData.startsWith("data:image")) {
      img.src = imageData;
    } else {
      img.src = `data:image/png;base64,${imageData}`;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("edit");
    setEditId(id);

    if (!id) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`/api/realdrawing/temporary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        loadImageToCanvas(res.data.imageData);
      })
      .catch((err) => {
        console.error("🛑 드로잉 로드 실패:", err);
        alert("그림을 불러오는 데 실패했습니다.");
      });
  }, [location.search, navigate]);

  return (
    <>
      <Header />
      <Container ref={containerRef} onWheel={handleWheel}>
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

        <CanvasContainer>
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
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: isPanning ? "grabbing" : undefined,
              }}
            />
          </CanvasWrapper>
        </CanvasContainer>

        {/* 제목 입력 모달 */}
        {showTitleModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>제목을 입력하세요</ModalTitle>
              <InputField
                type="text"
                value={drawingTitle}
                onChange={handleTitleChange}
                placeholder="제목을 입력해주세요."
              />
              <ButtonGroup>
                <ModalButton className="confirm" onClick={handleConfirmSave}>
                  확인
                </ModalButton>
                <ModalButton className="cancel" onClick={handleCancelSave}>
                  취소
                </ModalButton>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}
        {showDownloadNotice && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>📁 다운로드 안내</ModalTitle>
              <p style={{ fontSize: "15px", marginBottom: "10px" }}>
                <strong>💡 파일 탐색기가 안 뜨나요?</strong>
                <br />
                브라우저 설정에서 <br />
                <code>"다운로드 전에 저장 위치 확인"</code>을 켜주세요.
              </p>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
      {showSaveConfirmModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>정말 저장하시겠습니까?</ModalTitle>
            <ButtonGroup>
              <ModalButton className="confirm" onClick={handleConfirmDownload}>
                확인
              </ModalButton>
              <ModalButton
                className="cancel"
                onClick={() => setShowSaveConfirmModal(false)}
              >
                취소
              </ModalButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default DrawingCanvas;
