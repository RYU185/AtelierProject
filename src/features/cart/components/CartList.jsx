import React, { useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  margin: 0 24px 0 0;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  margin-right: 32px;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 10px 0;
`;

const ProductName = styled.div`
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 500;
`;

const PriceText = styled.div`
  font-size: 20px;
  color: #333;
  margin-bottom: 24px;
  font-weight: bold;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  color: #666;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 24px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const CartList = forwardRef(({ onUpdateTotal }, ref) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "핑거세이버 미니어쳐 ver3 (8.5조)",
      price: 42000,
      quantity: 2,
      image: "/images/goods1.jpg",
      checked: false
    },
    {
      id: 2,
      name: "핑거세이버 미니어쳐 ver3 (8.5조)",
      price: 42000,
      quantity: 1,
      image: "/images/goods1.jpg",
      checked: false
    },
  ]);

  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    selectAll: (checked) => {
      const newItems = items.map(item => ({ ...item, checked }));
      setItems(newItems);
      calculateTotal(newItems);
    },
    deleteSelected: () => {
      const newItems = items.filter(item => !item.checked);
      setItems(newItems);
      calculateTotal(newItems);
    },
    getSelectedItems: () => {
      return items.filter(item => item.checked);
    }
  }));

  const handleQuantityChange = (id, change) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setItems(newItems);
    calculateTotal(newItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    calculateTotal(newItems);
    if (newItems.length === 0) {
      navigate('/cartpage');
    }
  };

  const handleCheckItem = (id) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (currentItems) => {
    const selectedItems = currentItems.filter(item => item.checked);
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    onUpdateTotal({ 
      quantity: totalQuantity, 
      price: totalPrice,
      selectedItems: selectedItems
    });
  };

  return (
    <Container>
      {items.map((item) => (
        <CartItemContainer key={item.id}>
          <Checkbox 
            type="checkbox" 
            checked={item.checked}
            onChange={() => handleCheckItem(item.id)}
          />
          <ProductImage src={item.image} alt={item.name} />
          <ProductInfo>
            <ProductName>{item.name}</ProductName>
            <PriceText>{item.price.toLocaleString()}원</PriceText>
            <QuantityControl>
              <QuantityButton onClick={() => handleQuantityChange(item.id, -1)}>-</QuantityButton>
              <QuantityInput type="text" value={item.quantity} readOnly />
              <QuantityButton onClick={() => handleQuantityChange(item.id, 1)}>+</QuantityButton>
            </QuantityControl>
          </ProductInfo>
          <DeleteButton onClick={() => handleDelete(item.id)}>삭제</DeleteButton>
        </CartItemContainer>
      ))}
    </Container>
  );
});

export default CartList; 