import React from "react";
import styled from "styled-components";

const ReviewItem = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  position: relative;
`;

const ReviewerName = styled.div`
  font-weight: bold;
`;

const ReviewDate = styled.div`
  color: #666;
  font-size: 14px;
`;

const ReviewContent = styled.div`
  margin-top: 10px;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

function ReviewBlock() {
  return (
    <div>
      <ReviewItem>
        <ReviewerName>홍길동</ReviewerName>
        <ReviewDate>{new Date().toLocaleString()}</ReviewDate>
        <ReviewContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s,
        </ReviewContent>
        <MoreButton>⋮</MoreButton>
      </ReviewItem>
    </div>
  );
}

export default ReviewBlock;
