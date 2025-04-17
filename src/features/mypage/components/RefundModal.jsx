import styled from "styled-components";
import React, { useState } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 500px;
  padding: 32px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 32px;
`;

const TicketInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
`;

const ProductSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const ProductSubInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const ReasonSection = styled.div`
  margin-bottom: 24px;
`;

const ReasonTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: #333;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 16px;
  resize: none;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4199ff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 12px 32px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:first-child {
    background-color: white;
    border: 1px solid #e1e1e1;
    color: #666;
    &:hover {
      background-color: #f8f9fa;
    }
  }

  &:last-child {
    background-color: #4199ff;
    border: none;
    color: white;
    &:hover {
      background-color: #357abd;
    }
  }
`;

const RefundModal = ({ ticket, onClose }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (selectedReason === " 기타 다른 이유" && details.trim() === "") {
      setError("기타 사유를 입력해주세요.");
      return;
    }

    alert("환불 처리가 완료 되었습니다.");
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>교환 / 환불 신청</Title>

        <TicketInfo>
          <ProductSection>
            <ProductImage src={ticket.image} alt={ticket.title} />
            <ProductDetails>
              <ProductTitle>{ticket.title}</ProductTitle>
              <ProductSubInfo>{ticket.description}</ProductSubInfo>
              <ProductPrice>
                {ticket.price.split(" · ")[0]}
                <span style={{ color: "#666", marginLeft: "8px" }}>
                  수량: {ticket.price.split(" · ")[1]}
                </span>
              </ProductPrice>
            </ProductDetails>
          </ProductSection>
        </TicketInfo>

        <ReasonSection>
          <ReasonTitle>어떤 문제가 있었나요?</ReasonTitle>
          <RadioGroup>
            {[
              " 변심에 의한 상품 교환",
              " 상품을 잘못 주문함",
              " 상품 파손 또는 불량",
              " 다른 상품 오배송 또는 구성품 누락",
              " 상품 정보와 다름",
              " 기타 다른 이유",
            ].map((reason, index) => (
              <RadioLabel key={index}>
                <input
                  type="radio"
                  name="refundReason"
                  value={reason}
                  onChange={handleReasonChange}
                  checked={selectedReason === reason}
                />
                {reason}
              </RadioLabel>
            ))}
          </RadioGroup>

          <TextArea
            placeholder="상세 사유를 입력해주세요"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
              setError("");
            }}
            style={{
              borderColor:
                selectedReason === " 기타 다른 이유" && details.trim() === ""
                  ? "#ff4d4f"
                  : "#e1e1e1",
            }}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ReasonSection>

        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !selectedReason ||
              (selectedReason === " 기타 다른 이유" && details.trim() === "")
            }
            style={{
              opacity:
                !selectedReason ||
                (selectedReason === " 기타 다른 이유" && details.trim() === "")
                  ? 0.6
                  : 1,
              cursor:
                !selectedReason ||
                (selectedReason === " 기타 다른 이유" && details.trim() === "")
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            제출
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default RefundModal;
