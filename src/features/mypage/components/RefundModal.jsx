import React, { useState } from "react";
import styled from "styled-components";

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

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: #666;
  font-size: 14px;
`;

const Value = styled.span`
  color: #333;
  font-size: 14px;
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
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`;

const RadioInput = styled.input`
  cursor: pointer;
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

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
`;

const RefundModal = ({ ticket, onClose }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ticket) return null;

  const refundReasons = [
    "변심에 의한 상품 교환",
    "상품을 잘못 주문함",
    "상품 파손 또는 불량",
    "다른 상품 오배송 또는 구성품 누락",
    "상품 정보와 다름",
  ];

  const handleSubmit = async () => {
    try {
      // 유효성 검사
      if (!reason) {
        setError("환불 사유를 선택해주세요.");
        return;
      }

      if (!details.trim()) {
        setError("상세 사유를 입력해주세요.");
        return;
      }

      setError("");
      setIsSubmitting(true);

      // 환불 신청 데이터
      const refundData = {
        ticketId: ticket.id,
        reason: reason,
        details: details.trim(),
        productInfo: {
          title: ticket.title,
          price: ticket.price.split(" · ")[0],
          quantity: ticket.price.split(" · ")[1],
        },
      };

      // API 호출을 시뮬레이션 (실제로는 여기에 API 호출 코드가 들어갑니다)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 처리
      alert("환불 신청이 완료되었습니다.");
      onClose();
    } catch (error) {
      setError("환불 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
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
            {refundReasons.map((option) => (
              <RadioLabel key={option}>
                <RadioInput
                  type="radio"
                  name="reason"
                  value={option}
                  checked={reason === option}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setError("");
                  }}
                />
                {option}
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
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ReasonSection>

        <ButtonContainer>
          <Button onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "처리중..." : "제출"}
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default RefundModal;
