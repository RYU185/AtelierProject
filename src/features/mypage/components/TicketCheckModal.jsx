import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 600px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const TicketContainer = styled.div`
  padding: 20px;
`;

const TicketWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const TicketLeft = styled.div`
  flex: 2;
  padding: 30px;
  background-color: white;
  border-right: 1px dashed #ddd;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const TicketRight = styled.div`
  flex: 1;
  padding: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const TicketTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const TicketType = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #333;
`;

const TicketDate = styled.div`
  font-size: 16px;
  color: #666;
`;

const BarCode = styled.div`
  font-family: "Libre Barcode 39", cursive;
  font-size: 48px;
  letter-spacing: 5px;
`;

const TicketCheckModal = ({ isOpen, onClose, ticketInfo }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TicketContainer>
          <CloseButton onClick={onClose}>×</CloseButton>
          <TicketWrapper>
            <TicketLeft>
              <BarCode>6789</BarCode>
              <TicketTitle>{ticketInfo.galleryTitle}</TicketTitle>
              <TicketDate>
                {" "}
                {ticketInfo.date} 성인 {ticketInfo.headcount}
              </TicketDate>
              <BarCode>012345</BarCode>
            </TicketLeft>
          </TicketWrapper>
        </TicketContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TicketCheckModal;
