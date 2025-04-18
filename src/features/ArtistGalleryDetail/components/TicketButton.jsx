import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../components/AuthContext";

export const Button = styled.div`
  width: 250px;
  text-align: center;
  border: 1px solid #018ec8;
  border-radius: 5px;
  background-color: #018ec8;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #007acc;
  }
`;

function TicketButton({ galleryId }) {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleClick = () => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login", { state: { from: `/ticket/${galleryId}` } });
      return;
    }
    navigate(`/ticket/${galleryId}`);
  };

  return (
    <div>
      <Button onClick={handleClick}>티켓 예매하기</Button>
    </div>
  );
}


export default TicketButton;
