import React from "react";
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;

const ProductDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
`;

const PurchaseButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }
`;

function GoodsDetail() {
  const { id } = useParams();
  
  const products = {
    1: {
      name: "전시 굿즈 1",
      price: "₩30,000",
      image: goods1,
      description: "전시 굿즈 1에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    2: {
      name: "전시 굿즈 2",
      price: "₩25,000",
      image: goods2,
      description: "전시 굿즈 2에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    3: {
      name: "전시 굿즈 3",
      price: "₩35,000",
      image: goods3,
      description: "전시 굿즈 3에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    4: {
      name: "전시 굿즈 4",
      price: "₩28,000",
      image: goods4,
      description: "전시 굿즈 4에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    5: {
      name: "전시 굿즈 5",
      price: "₩32,000",
      image: goods5,
      description: "전시 굿즈 5에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    6: {
      name: "전시 굿즈 6",
      price: "₩27,000",
      image: goods6,
      description: "전시 굿즈 6에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    7: {
      name: "전시 굿즈 7",
      price: "₩33,000",
      image: goods7,
      description: "전시 굿즈 7에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    8: {
      name: "전시 굿즈 8",
      price: "₩29,000",
      image: goods8,
      description: "전시 굿즈 8에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    9: {
      name: "전시 굿즈 9",
      price: "₩31,000",
      image: goods9,
      description: "전시 굿즈 9에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    },
    10: {
      name: "전시 굿즈 10",
      price: "₩26,000",
      image: goods10,
      description: "전시 굿즈 10에 대한 자세한 설명입니다. 이 상품은 전시회에서만 구매할 수 있는 특별한 아이템입니다."
    }
  };

  const product = products[id];

  if (!product) {
    return (
      <>
        <Header />
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
      <Container>
        <ProductContainer>
          <ImageSection>
            <ProductImage src={product.image} alt={product.name} />
          </ImageSection>
          <InfoSection>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>{product.price}</ProductPrice>
            <ProductDescription>
              {product.description}
            </ProductDescription>
            <PurchaseButton>구매하기</PurchaseButton>
          </InfoSection>
        </ProductContainer>
      </Container>
      <Footer />
    </>
  );
}

export default GoodsDetail;
