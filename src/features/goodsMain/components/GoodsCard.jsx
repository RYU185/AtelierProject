import React from "react";
import styled from "styled-components";

const CardWrap = styled.div`
  width: 300px;
  border: none;
  margin: 0 auto;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  
`;

const GoodsIntro= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

function GoodsCard() {
  return (
    <CardWrap>
      <Img src="/src/assets/GoodsIMG/goods1.jpg" alt="1번 굿즈 이미지" />
      <GoodsIntro>
        <h3>TITLE</h3>
        <p>20000원</p>
      </GoodsIntro>
    </CardWrap>
  );
}

export default GoodsCard;
