import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import goods1 from "../../assets/GoodsIMG/goods1.jpg";
import goods2 from "../../assets/GoodsIMG/goods2.jpg";
import goods3 from "../../assets/GoodsIMG/goods3.jpg";
import goods4 from "../../assets/GoodsIMG/goods4.jpg";
import goods5 from "../../assets/GoodsIMG/goods5.jpg";
import goods6 from "../../assets/GoodsIMG/goods6.jpg";
import goods7 from "../../assets/GoodsIMG/goods7.jpg";
import goods8 from "../../assets/GoodsIMG/goods8.jpg";
import goods9 from "../../assets/GoodsIMG/goods9.jpg";
import goods10 from "../../assets/GoodsIMG/goods10.jpg";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  position: relative;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  position: relative;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
`;

const MainImageContainer = styled.div`
  flex: 1;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: zoom-in;
`;

const ZoomedImage = styled.div`
  position: absolute;
  left: 105%;
  top: 0;
  width: 400px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  pointer-events: none;
`;

const ZoomedImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center center;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
`;

const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? "#0068ca" : "transparent")};

  &:hover {
    opacity: 0.8;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 20px;
  position: sticky;
  // position: sticky
  // 스크롤이 해당 위치에 도달했을때부터 고정을 시작하겠다고 설정

  top: 160px;
  height: fit-content;
  background: white;
  border-radius: 8px;
  border: 1px solid #c9c9c9;
  margin-left: 40px;
  margin-top: 10px;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #333;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProductDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 20px 0 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GoToCartButton = styled.button`
  width: 100%;
  height: 60px;
  padding: 15px;
  background-color: #f3f3f3;
  color: #0068ca;
  border: 2px solid #0068ca;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const PurchaseButton = styled.button`
  width: 100%;
  height: 60px;
  padding: 15px;
  background-color: #0068ca;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #004483;
  }
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CounterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CounterButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;

const CounterInput = styled.input`
  width: 40px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  outline: none;
  margin-left: 10px;
  padding-left: 2px;
`;

const Stock = styled.div`
  margin-bottom: 20px;
  display: ${({ stockWarning }) => (stockWarning ? "block" : "none")};
`;

const StockText = styled.div`
  font-size: 16px;
`;

const StockWarning = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const AmountCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const AmountCount = styled.div`
  font-size: 24px;
`;

const AmountCountText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0068ca;
`;

function GoodsDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(10);
  const [stockWarning, setStockWarning] = useState(false); // 재고 경고 표시
  const [selectedImage, setSelectedImage] = useState(0); // 선택된 이미지 썸네일 알려주기
  // 확대 창 상태관리
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // 배웠던거 - drowing에서 썼던 상태관리

  const handleIncrease = () => {
    if (stock > 0) {
      setQuantity((prev) => prev + 1);
      setStock((prev) => prev - 1);
      if (stock <= stock * 0.2) {
        // 20% 이하일 때
        setStockWarning(true);
      }
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setStock((prev) => prev + 1);
      if (stock > 2) {
        // 20% 초과일 때
        setStockWarning(false);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  // 화면 확대 창 보여주기
  // 처음 사용해보는 메서드나 기능이 포함됨
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // getBoundingClientRect();
    // 현재 요소의 위치와 크기 가져오는 메서드
    // x, y, width, height 값을 모두 가져옴
    const x = e.clientX - rect.left; // 마우스 위치 - 요소 위치를 빼는 값
    const y = e.clientY - rect.top;

    // 이미지의 중앙을 기준으로 상대적인 위치를 계산해야하니까 백분율로 계산
    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;

    // 중앙(50%)을 기준으로 -50~50 범위로 변환
    let centeredX = relativeX - 50;
    let centeredY = relativeY - 50;

    // 확대된 이미지가 원본 이미지의 범위를 벗어나지 않도록 제한해야함
    const maxOffset = 25; // 50%의 절반 (2배 확대이므로)
    // 왜?
    // 이미지가 2배 (scale(2)) 확대되었으므로
    // 중앙(50%)을 기준으로 -50~50 범위로 변환
    centeredX = Math.max(Math.min(centeredX, maxOffset), -maxOffset);
    // centeredX값이 25보다 크면 25로 제한
    // 그러니까 마우스 위치값이 30이면 25로 강제로 제한해버림
    centeredY = Math.max(Math.min(centeredY, maxOffset), -maxOffset);

    setMousePosition({
      x: centeredX,
      y: centeredY,
    });
  };


  

  const products = {
    1: {
      name: "전시 굿즈 1",
      price: 30000,
      image: goods1,
      description:
        "전시 굿즈 1에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    2: {
      name: "전시 굿즈 2",
      price: 25000,
      image: goods2,
      description:
        "전시 굿즈 2에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    3: {
      name: "전시 굿즈 3",
      price: 35000,
      image: goods3,
      description:
        "전시 굿즈 3에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    4: {
      name: "전시 굿즈 4",
      price: 28000,
      image: goods4,
      description:
        "전시 굿즈 4에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    5: {
      name: "전시 굿즈 5",
      price: 32000,
      image: goods5,
      description:
        "전시 굿즈 5에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    6: {
      name: "전시 굿즈 6",
      price: 27000,
      image: goods6,
      description:
        "전시 굿즈 6에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    7: {
      name: "전시 굿즈 7",
      price: 33000,
      image: goods7,
      description:
        "전시 굿즈 7에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    8: {
      name: "전시 굿즈 8",
      price: 29000,
      image: goods8,
      description:
        "전시 굿즈 8에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    9: {
      name: "전시 굿즈 9",
      price: 31000,
      image: goods9,
      description:
        "전시 굿즈 9에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
    10: {
      name: "전시 굿즈 10",
      price: 26000,
      image: goods10,
      description:
        "전시 굿즈 10에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다.",
    },
  };

  const product = products[id];

  if (!product) {
    return (
      <>
        <Header />
        <TitleContainer>
          <BackTitle>Gallery Goods</BackTitle>
          <Title>Gallery Goods</Title>
        </TitleContainer>
        <Container>
          <ProductTitle>상품을 찾을 수 없습니다.</ProductTitle>
        </Container>
        <Footer />
      </>
    );
  }

  const productImages = {
    1: [goods1, goods2, goods3, goods4, goods5],
    2: [goods2, goods3, goods4, goods5, goods6],
    3: [goods3, goods4, goods5, goods6, goods7],
    4: [goods4, goods5, goods6, goods7, goods8],
    5: [goods5, goods6, goods7, goods8, goods9],
    6: [goods6, goods7, goods8, goods9, goods10],
    7: [goods7, goods8, goods9, goods10, goods1],
    8: [goods8, goods9, goods10, goods1, goods2],
    9: [goods9, goods10, goods1, goods2, goods3],
    10: [goods10, goods1, goods2, goods3, goods4],
  };

  const currentProductImages = productImages[id];

  return (
    <>
      <Header />
      <TitleContainer>
        <BackTitle>Gallery Goods</BackTitle>
        <Title>Gallery Goods</Title>
      </TitleContainer>
      <Container>
        <ProductContainer>
          <ImageSection>
            <MainImage
              src={currentProductImages[selectedImage]}
              alt={product.name}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <ThumbnailContainer>
              {currentProductImages.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image}
                  alt={`${product.name} 썸네일 ${index + 1}`}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailContainer>
            <ZoomedImage isVisible={isZoomed}>
              <ZoomedImageContent
                src={currentProductImages[selectedImage]}
                alt={`${product.name} 확대`}
                style={{
                  transform: `scale(2) translate(${-mousePosition.x * 4}px, ${
                    -mousePosition.y * 4
                  }px)`,
                  transformOrigin: "center center",
                }}
              />
            </ZoomedImage>
          </ImageSection>
          <InfoSection>
            <ProductTitle>{product.name}</ProductTitle>
            <hr />
            <ProductDescription>
              {product.description}
              <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
            </ProductDescription>

            <CounterWrapper>
              수량
              <CounterButtonContainer>
                <CounterButton onClick={handleDecrease}>-</CounterButton>
                <CounterInput type="number" value={quantity} readOnly />
                <CounterButton onClick={handleIncrease}>+</CounterButton>
              </CounterButtonContainer>
            </CounterWrapper>

            <Stock>
              <StockText>남은 재고: {stock}개</StockText>
              {stockWarning && <StockWarning>재고가 부족합니다!</StockWarning>}
            </Stock>
            <hr />

            <AmountCountContainer>
              <AmountCount>총 금액</AmountCount>
              <AmountCountText>{(product.price * quantity).toLocaleString()}원</AmountCountText>
            </AmountCountContainer>

            <ButtonContainer>
              <GoToCartButton>장바구니 담기</GoToCartButton>
              <PurchaseButton>바로 구매하기</PurchaseButton>
            </ButtonContainer>
          </InfoSection>
        </ProductContainer>
      </Container>
      <Footer />
    </>
  );
}

export default GoodsDetail;
