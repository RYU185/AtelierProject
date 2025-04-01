import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";

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

  return (
    <>
      <Header />
      <Container>
        <ProductContainer>
          <ImageSection>
            <ProductImage src="/placeholder.jpg" alt="Product" />
          </ImageSection>
          <InfoSection>
            <ProductTitle>상품명</ProductTitle>
            <ProductPrice>₩50,000</ProductPrice>
            <ProductDescription>
              상품에 대한 자세한 설명이 들어갑니다. 여러 줄의 설명을 작성할 수 있습니다.
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
