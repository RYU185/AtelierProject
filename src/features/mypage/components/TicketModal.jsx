import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Wrapper = styled.div`
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: -24px;
  right: -24px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10000;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 36px;
    height: 3px;
    background-color: white;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Ticket = styled.div`
  display: flex;
  width: 800px;
  height: 280px;
  background: white;
  border-radius: 10px;
  border: 1px solid #ccc;
  overflow: hidden;
  font-family: "Arial", sans-serif;
`;

const Side = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: ${({ right }) => (right ? "none" : "1px dashed #ccc")};
  border-left: ${({ right }) => (right ? "1px dashed #ccc" : "none")};
`;

const BarcodeImg = styled.img`
  height: 220px;
  object-fit: contain;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainTitle = styled.div`
  font-size: 52px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
`;

const Info = styled.div`
  font-size: 16px;
  margin-top: 8px;
`;

const TicketModal = ({ ticket, onClose }) => {
  const { title, date, people } = ticket;

  return (
    <Overlay>
      <Wrapper>
        <CloseBtn onClick={onClose} />

        <Ticket>
          <Side>
            <BarcodeImg src="/images/barcode-left.png" alt="왼쪽 바코드" />
          </Side>

          <Center>
            <MainTitle>TICKET</MainTitle>
            <SubTitle>{title}</SubTitle>
            <Info>
              {date} {people}
            </Info>
          </Center>

          <Side right>
            <BarcodeImg src="/images/barcode-right.png" alt="오른쪽 바코드" />
          </Side>
        </Ticket>
      </Wrapper>
    </Overlay>
  );
};

export default TicketModal;
