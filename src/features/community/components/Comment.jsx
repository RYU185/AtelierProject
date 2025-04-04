import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  gap: 570px;
`;

const CommentText = styled.p`
  font-size: 16px;
  color: #333;
`;

function Comment({ nickname, text, date }) {
  return (
    <CommentWrapper>
      <CommentHeader>
        <strong>{nickname}</strong>
        <span>{date}</span>
      </CommentHeader>
      <CommentText>{text}</CommentText>
    </CommentWrapper>
  );
}

export default Comment;
