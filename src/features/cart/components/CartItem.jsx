import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid #eee;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 16px 0 0;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  margin-right: 24px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 16px 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 24px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
`;

const Price = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-left: 40px;
  min-width: 100px;
  text-align: right;
`;

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <Container>
      <Checkbox type="checkbox" />
      <ProductImage
        src={`${import.meta.env.VITE_API_URL}${item.image}`}
        alt={item.name}
      />
      <ProductInfo>
        <ProductName>{item.name}</ProductName>
        <QuantityControl>
          <QuantityButton onClick={handleDecrease}>-</QuantityButton>
          <QuantityInput
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <QuantityButton onClick={handleIncrease}>+</QuantityButton>
        </QuantityControl>
      </ProductInfo>
      <Price>{(item.price * quantity).toLocaleString()}원</Price>
    </Container>
  );
};

export default CartItem;
