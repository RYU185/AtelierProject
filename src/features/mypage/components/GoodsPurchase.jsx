import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import styled from "styled-components";
import ExchangeRefundModal from "./ExchangeRefundModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 722px;
  align-self: stretch;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  max-width: 1000px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border: 2px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  color: #ffffff;
  transition: 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.07);

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
  cursor: pointer;
  color: #0095e1;
`;

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 435px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #02a5e637;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const PurchaseCard = styled.div`
  display: flex;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.07);
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
  color: #e1e1e1;
  margin: 0;
`;

const PurchaseDate = styled.span`
  font-size: 14px;
  color: #c2c2c2;
`;

const GoodsDetails = styled.div`
  font-size: 14px;
  color: #e2e2e2;
  line-height: 1.5;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #e9e9e9;
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
  const [showModal, setShowModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 초기화

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchPurchases = async () => {
      try {
        const response = await axiosInstance.get("/purchase/view"); // ✅ baseURL에 이미 /api 있음!
        setPurchases(response.data);
      } catch (error) {
        console.error("❌ 구매내역 불러오기 실패:", error);
      }
    };

    fetchPurchases();
  }, []);

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.goodsName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefund = (purchase) => {
    const formatted = {
      id: purchase.purchaseId,
      title: purchase.goodsName,
      image: purchase.thumbnailUrl?.startsWith("/uploads")
        ? `${purchase.thumbnailUrl}`
        : `/images/goods-images/${purchase.thumbnailUrl}`,
      price: `환불금액: ${(
        purchase.price * purchase.quantity
      ).toLocaleString()}원 · ${purchase.quantity}개
      (1개 당 ${purchase.price.toLocaleString()}원) `,
      description: `구매일: ${new Date(
        purchase.purchaseDate
      ).toLocaleDateString()}`,
    };

    setSelectedPurchase(formatted);
    setShowModal(true);
  };
  const handleRefundSuccess = (deletedId) => {
    setPurchases((prev) =>
      prev.filter((purchase) => purchase.purchaseId !== deletedId)
    );
  };

  // 리뷰 작성하기 버튼 클릭 핸들러
  const handleWriteReview = (goodsId) => {
    navigate(`/goods/${goodsId}`); // 해당 goodsId를 파라미터로 상세 페이지로 이동
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
        {filteredPurchases.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "16px", color: "#888" }}>
            구매내역이 없습니다.
          </p>
        ) : (
          filteredPurchases.map((purchase, index) => (
            <PurchaseCard
              key={`${purchase.goodsId}-${purchase.purchaseDate}-${index}`}
            >
              <GoodsImage
                src={
                  purchase.thumbnailUrl?.startsWith("/uploads")
                    ? `${import.meta.env.VITE_API_URL}${purchase.thumbnailUrl}`
                    : `/images/goods-images/${purchase.thumbnailUrl}`
                }
                alt={purchase.goodsName}
              />
              <GoodsInfo>
                <div>
                  <GoodsHeader>
                    <GoodsTitle>{purchase.goodsName}</GoodsTitle>
                    <PurchaseDate>
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </PurchaseDate>
                  </GoodsHeader>
                  <GoodsDetails>수량: {purchase.quantity}개</GoodsDetails>
                  <Price>
                    총 금액:{" "}
                    {(purchase.price * purchase.quantity).toLocaleString()}원 (
                    1개 당 {purchase.price.toLocaleString()}원 )
                  </Price>
                </div>
                <ButtonContainer>
                  <ActionButton
                    onClick={() => handleWriteReview(purchase.goodsId)}
                  >
                    리뷰 작성/ 상품 구경하기
                  </ActionButton>

                  <ActionButton onClick={() => handleRefund(purchase)}>
                    교환/환불 신청
                  </ActionButton>
                </ButtonContainer>
              </GoodsInfo>
            </PurchaseCard>
          ))
        )}
      </PurchaseList>

      {showModal && (
        <ExchangeRefundModal
          purchase={selectedPurchase}
          onClose={() => setShowModal(false)}
          onSuccess={handleRefundSuccess} // 👈 콜백 전달
        />
      )}
    </Container>
  );
};

export default GoodsPurchase;
