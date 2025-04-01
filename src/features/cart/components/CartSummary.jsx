import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 380px;
  padding: 32px;
  background-color: #fff;
  border-radius: 12px;
  position: sticky;
  top: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  font-size: 24px;
  color: #0066ff;
  margin-bottom: 32px;
  font-weight: bold;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  &:last-child {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }
`;

const Label = styled.span`
  font-size: 16px;
  color: #666;
`;

const Value = styled.span`
  font-size: ${props => props.total ? "24px" : "16px"};
  font-weight: ${props => props.total ? "bold" : "normal"};
  color: ${props => props.total ? "#0066ff" : "#666"};
`;

const SelectedInfo = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #eee;
`;

const SelectedTitle = styled.h4`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
`;

const PurchaseButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 32px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052cc;
  }
`;

const CartSummary = ({ total, onPurchase }) => {
  const selectedCount = total.selectedItems?.length || 0;

  return (
    <Container>
      <Title>주문 예상 금액</Title>
      <SummaryRow>
        <Label>총 상품 수</Label>
        <Value>{total.quantity}개</Value>
      </SummaryRow>
      <SummaryRow>
        <Label>총 상품 금액</Label>
        <Value>{total.price.toLocaleString()}원</Value>
      </SummaryRow>
      {selectedCount > 0 && (
        <SelectedInfo>
          <SelectedTitle>선택된 상품</SelectedTitle>
          <SummaryRow>
            <Label>선택한 상품 수</Label>
            <Value>{selectedCount}개</Value>
          </SummaryRow>
        </SelectedInfo>
      )}
      <PurchaseButton onClick={onPurchase}>
        {selectedCount > 0 ? `선택한 ${selectedCount}개 상품 구매하기` : "구매하기"}
      </PurchaseButton>
    </Container>
  );
};

export default CartSummary;