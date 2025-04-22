import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* 부모 너비에 맞춤 */
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline; /* 닉네임과 날짜 baseline 정렬 */
  font-size: 12px; /* 크기 줄임 */
  color: #777; /* 색상 변경 */
  margin-bottom: 5px;
`;

const Nickname = styled.strong`
  font-size: 14px; /* 닉네임 강조 */
  color: #333;
  margin-right: 8px; /* 닉네임과 날짜 간 간격 */
`;

const DateText = styled.span`
  font-size: 11px;
`;

const CommentText = styled.p`
  font-size: 14px; /* 크기 조정 */
  color: #333;
  line-height: 1.4; /* 줄 간격 조정 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
`;

function Comment({ nickname, text, date }) {
  return (
    <CommentWrapper>
      <CommentHeader>
        <Nickname>{nickname}</Nickname>
        <DateText>{date}</DateText>
      </CommentHeader>
      <CommentText>{text}</CommentText>
    </CommentWrapper>
  );
}

export default Comment;
