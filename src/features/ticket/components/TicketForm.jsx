import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #f4faff;
  padding: 20px;
  border-radius: 10px;
`;

const Notice = styled.div`
  background-color: #fff;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const SubLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  margin-bottom: 10px;
`;

const PeopleSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 10px 12px;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const Count = styled.div`
  width: 30px;
  text-align: center;
  font-weight: bold;
`;

const Total = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
`;

const ReserveButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 16px 0;
  background-color: #0094ff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #0094ff;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s;

  &:hover {
    background-color: #007acc;
    transform: translateY(10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TICKET_PRICE = 10000;

const TicketForm = () => {
  const [count, setCount] = useState(1);

  const handleMinus = () => {
    if (count > 1) setCount(count - 1);
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  const total = count * TICKET_PRICE;

  const handleReserve = () => {
    alert(`🎫 ${count}명 예약 완료 (${total.toLocaleString()}원)`);
  };

  return (
    <Wrapper>
      <Notice>
        예약 안내 <br />
        - 만 19세 미만 청소년은 예매 불가 <br />
        - 공연 하루 전까지 취소/환불 가능 <br />
        - 좌석은 자동 배정됩니다 <br />- 티켓은 1인 1매 기준이며, 공연 10분
        전까지 입장해주세요.
      </Notice>

      <FormGroup>
        <Label>인원 선택</Label>
        <SubLabel>
          * 만 19세 미만 청소년은 티켓을 구매하실 수 없습니다.
        </SubLabel>

        <PeopleSelector>
          <span>성인</span>
          <Button onClick={handleMinus}>-</Button>
          <Count>{count}</Count>
          <Button onClick={handlePlus}>+</Button>
        </PeopleSelector>
      </FormGroup>

      <Total>
        총 <strong>{total.toLocaleString()}</strong> 원
      </Total>

      <ReserveButton onClick={handleReserve} >예매하기</ReserveButton>
    </Wrapper>
  );
};

export default TicketForm;
