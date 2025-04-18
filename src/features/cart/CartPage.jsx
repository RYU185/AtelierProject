import React, { useState, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import Header from "../Header";
import Footer from "../Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
  flex: 1;
`;

const TitleContainer = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 80px;
`;

const BackTitle = styled.h1`
  font-size: 140px;
  font-weight: bold;
  color: rgba(200, 216, 247, 0.3);
  margin: 0;
  line-height: 1;
`;

const FrontTitle = styled.h2`
  font-size: 48px;
  color: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-weight: bold;
`;

const CartContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const CartContent = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
`;

const SelectAllBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  accent-color: #0066ff;
`;

const SelectAllText = styled.span`
  font-size: 14px;
  color: #666;
`;

const DeleteButton = styled.button`
  margin-left: auto;
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  color: #666;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  font-size: 18px;
  color: #666;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  z-index: 1000;
  min-width: 400px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalText = styled.p`
  font-size: 24px;
  color: #333;
  margin-bottom: 32px;
  font-weight: bold;
`;

const ModalButton = styled.button`
  padding: 16px 48px;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0052cc;
  }
`;

const CartPage = () => {
  const navigate = useNavigate();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cartListRef = useRef();
  const [total, setTotal] = useState({
    quantity: 0,
    price: 0,
    selectedItems: [],
    hasItems: true,
  });
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setIsAllSelected(checked);
    if (cartListRef.current) {
      cartListRef.current.selectAll(checked);
      const selectedItems = cartListRef.current.getSelectedItems();
      const newTotal = {
        quantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
        price: selectedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        selectedItems: selectedItems,
        hasItems: selectedItems.length > 0,
      };
      setTotal(newTotal);
    }
  };

  const handleDeleteSelected = () => {
    if (cartListRef.current) {
      cartListRef.current.deleteSelected();
    }
  };

  const handleUpdateTotal = (newTotal) => {
    setTotal(newTotal);
    setIsEmpty(!newTotal.hasItems);

    if (cartListRef.current) {
      const selectedItems = cartListRef.current.getSelectedItems();
      const allItems = cartListRef.current.getAllItems();

      // 장바구니가 비어있는지 확인 (전체 아이템 기준)
      setIsEmpty(newTotal.hasItems === false);

      // 전체 선택 여부도 다시 계산
      const isAllSelected =
        selectedItems.length > 0 && selectedItems.length === allItems.length;
      setIsAllSelected(isAllSelected);
    }
  };

  const handlePurchase = () => {
    if (!cartListRef.current) return;

    const selectedItems = cartListRef.current.getSelectedItems();
    if (selectedItems.length === 0) {
      alert("구매할 상품을 선택해주세요.");
      return;
    }
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!cartListRef.current) return;

    const selectedItems = cartListRef.current.getSelectedItems();
    const cartIds = selectedItems.map((item) => item.id);

    try {
      const response = await axiosInstance.post("/purchase", cartIds);
      const { data } = response;

      navigate("/purchase-complete", {
        state: {
          items: data.goods,
          totalPrice: data.totalPrice,
          purchaseDate: data.purchaseDate,
          purchaseId: data.purchaseId,
        },
      });
    } catch (err) {
      console.error("구매 실패:", err);
      alert("구매 처리 중 문제가 발생했습니다.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Wrapper>
      <Header />
      <PageContainer>
        <TitleContainer>
          <BackTitle>CART</BackTitle>
          <FrontTitle>CART</FrontTitle>
        </TitleContainer>
        <CartContainer>
          <CartContent>
            {isEmpty ? (
              <EmptyCartMessage>
                장바구니가 비어있습니다.
                <br />
                상품을 추가해주세요.
              </EmptyCartMessage>
            ) : (
              <>
                <SelectAllBar>
                  <Checkbox
                    type="checkbox"
                    id="selectAll"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  <SelectAllText>전체 선택</SelectAllText>
                  <DeleteButton onClick={handleDeleteSelected}>
                    선택상품 삭제
                  </DeleteButton>
                </SelectAllBar>
                <CartList ref={cartListRef} onUpdateTotal={handleUpdateTotal} />
              </>
            )}
          </CartContent>
          <CartSummary total={total} onPurchase={handlePurchase} />
        </CartContainer>
      </PageContainer>
      <Footer />
      {showModal && (
        <>
          <ModalOverlay onClick={() => setShowModal(false)} />
          <Modal>
            <ModalText>구매하시겠습니까?</ModalText>
            <ModalButton onClick={handleConfirmPurchase}>확인</ModalButton>
          </Modal>
        </>
      )}
    </Wrapper>
  );
};

export default CartPage;
