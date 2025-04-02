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
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 10px 0;
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
  font-size: 16px;
`;

function GoodsDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(10);
  const [stockWarning, setStockWarning] = useState(false);

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
            <ProductImage src={product.image} alt={product.name} />
            <ProductImage src={product.image} alt={product.name} />
            <ProductImage src={product.image} alt={product.name} />
            <ProductImage src={product.image} alt={product.name} />
            <ProductImage src={product.image} alt={product.name} />
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
              <AmountCount>{(product.price * quantity).toLocaleString()}원</AmountCount>
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
