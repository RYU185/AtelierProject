import React, { useState } from "react";
import styled from "styled-components";
import RefundModal from "./RefundModal";

const Container = styled.div`
  width: 722px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4199ff;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PurchaseCard = styled.div`
  display: flex;
  padding: 24px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const GoodsImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const GoodsInfo = styled.div`
  flex: 1;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GoodsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const GoodsTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const PurchaseDate = styled.span`
  font-size: 14px;
  color: #999;
`;

const GoodsDetails = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-top: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const GoodsPurchase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const purchases = [
    {
      id: 1,
      title: "빈가사유실 미니어쳐 vol.5 (8종중)",
      date: "2025.03.02",
      image: "/images/goods1.jpg",
      description: "",
      price: "42000원 · 1개",
    },
  ];

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReview = (purchase) => {
    // 리뷰 작성 로직
  };

  const handleAddToCart = (purchase) => {
    // 장바구니 담기 로직
  };

  const handleRefund = (purchase) => {
    setSelectedItem(purchase);
    setShowRefundModal(true);
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="구매한 상품을 검색할 수 있어요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>

      <PurchaseList>
        {filteredPurchases.map((purchase) => (
          <PurchaseCard key={purchase.id}>
            <GoodsImage src={purchase.image} alt={purchase.title} />
            <GoodsInfo>
              <div>
                <GoodsHeader>
                  <GoodsTitle>{purchase.title}</GoodsTitle>
                  <PurchaseDate>{purchase.date}</PurchaseDate>
                </GoodsHeader>
                <GoodsDetails>{purchase.description}</GoodsDetails>
                <Price>{purchase.price}</Price>
              </div>
              <ButtonContainer>
                <ActionButton onClick={() => handleReview(purchase)}>
                  리뷰 작성하기
                </ActionButton>
                <ActionButton onClick={() => handleAddToCart(purchase)}>
                  장바구니 담기
                </ActionButton>
                <ActionButton onClick={() => handleRefund(purchase)}>
                  교환/환불 신청
                </ActionButton>
              </ButtonContainer>
            </GoodsInfo>
          </PurchaseCard>
        ))}
      </PurchaseList>

      {showRefundModal && (
        <RefundModal
          ticket={selectedItem}
          onClose={() => setShowRefundModal(false)}
        />
      )}
    </Container>
  );
};

export default GoodsPurchase;
