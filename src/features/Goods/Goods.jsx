import React from "react";
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

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BackTitle = styled.h1`
  font-size: 140px;
  text-align: center;
  color: #deeaff;
  padding-top: 100px;
  margin-bottom: 0px;
`;

const Title = styled.h1`
  font-size: 90px;
  text-align: center;
  margin-top: -130px;
  margin-bottom: 150px;
`;

// 그리드 설정
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all 0.3s ease;
`;

const ProductInfo = styled.div`
  padding: 15px;
  background: white;
  transition: all 0.3s ease;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  transition: all 0.3s ease;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(0.98);

    ${ProductImage} {
      filter: brightness(1.1);
    }

    ${ProductInfo} {
      background-color: #0055aa;
    }

    ${ProductName} {
      color: #ffffff;
    }

    ${ProductPrice} {
      color: #ffffff;
    }
  }
`;

function Goods() {
  const products = [
    {
      id: 1,
      name: "전시 굿즈 1",
      price: "₩30,000",
      image: goods1,
    },
    {
      id: 2,
      name: "전시 굿즈 2",
      price: "₩25,000",
      image: goods2,
    },
    {
      id: 3,
      name: "전시 굿즈 3",
      price: "₩35,000",
      image: goods3,
    },
    {
      id: 4,
      name: "전시 굿즈 4",
      price: "₩28,000",
      image: goods4,
    },
    {
      id: 5,
      name: "전시 굿즈 5",
      price: "₩32,000",
      image: goods5,
    },
    {
      id: 6,
      name: "전시 굿즈 6",
      price: "₩27,000",
      image: goods6,
    },
    {
      id: 7,
      name: "전시 굿즈 7",
      price: "₩33,000",
      image: goods7,
    },
    {
      id: 8,
      name: "전시 굿즈 8",
      price: "₩29,000",
      image: goods8,
    },
    {
      id: 9,
      name: "전시 굿즈 9",
      price: "₩31,000",
      image: goods9,
    },
    {
      id: 10,
      name: "전시 굿즈 10",
      price: "₩26,000",
      image: goods10,
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <TitleContainer>
          <BackTitle>GALLERY GOODS</BackTitle>
          <Title>GALLERY GOODS</Title>
        </TitleContainer>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Container>
      <Footer />
    </>
  );
}

export default Goods;
