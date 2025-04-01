import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardWrap = styled.div`
  width: 300px;
  border: none;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;

const GoodsIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function GoodsCard() {
  return (
    <Link to="/GoodsDetail" style={{ textDecoration: "none", color: "inherit" }}>
      <CardWrap>
        <Img src="/src/assets/GoodsIMG/goods1.jpg" alt="1번 굿즈 이미지" />
        <GoodsIntro>
          <h3>TITLE</h3>
          <p>20000원</p>
        </GoodsIntro>
      </CardWrap>
    </Link>
  );
}

export default GoodsCard;
