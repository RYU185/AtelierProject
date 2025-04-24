import React from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CommentContainer = styled.div`
  padding: 10px 0;
  border-bottom: 2px solid #e0e0e0; /* 구분선 두께와 색상 변경 */
  display: flex;
  gap: 10px;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  align-items: center; /* 아이콘과 닉네임/일자 묶음 가운데 정렬 */
`;

const Nickname = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  text-align: center; /* 닉네임 가운데 정렬 */
`;

const DateInfo = styled.div`
  font-size: 11px;
  color: #888;
  margin-top: 3px; /* 아이콘과의 간격 */
`;

const CommentContent = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  flex-grow: 1;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column; /* 아이콘 묶음과 일자를 세로로 배치 */
  align-items: center; /* 가운데 정렬 */
  gap: 5px; /* 아이콘 사이 및 아이콘-일자 간 간격 */
`;

const IconsWrapper = styled.div`
  display: flex;
  gap: 8px; /* 아이콘 사이 간격 */
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #333;
  }

  svg {
    font-size: 21px;
  }

  &.delete {
    color: #e74c3c;

    &:hover {
      color: #972e23;
    }
  }
`;

function Comment({ user, text, date }) {
  return (
    <CommentContainer>
      <UserInfo>
        <Nickname>{user}</Nickname>
      </UserInfo>
      <CommentContent>{text}</CommentContent>
      <Actions>
        <IconsWrapper>
          <ActionButton>
            <FiEdit />
          </ActionButton>
          <ActionButton className="delete">
            <FiTrash2 />
          </ActionButton>
        </IconsWrapper>
        <DateInfo>{date}</DateInfo>
      </Actions>
    </CommentContainer>
  );
}

export default Comment;
