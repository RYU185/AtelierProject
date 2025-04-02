import React, { useState } from "react";
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

const DropdownMenu = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 15px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

function ReviewBlock({ review }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMoreClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ReviewItem>
        <ReviewerName>홍길동</ReviewerName>
        <ReviewDate>{new Date(review.createdAt).toLocaleString()}</ReviewDate>
        <ReviewContent>{review.content}</ReviewContent>
        <MoreButton onClick={handleMoreClick}>⋮</MoreButton>
        <DropdownMenu isOpen={isOpen}>
          <MenuButton>수정</MenuButton>
          <MenuButton>삭제</MenuButton>
        </DropdownMenu>
      </ReviewItem>
    </div>
  );
}

export default ReviewBlock;
