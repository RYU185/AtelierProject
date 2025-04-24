import React from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CommentContainer = styled.div`
  padding: 10px 0;
  border-bottom: 2px solid #e0e0e0;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  grid-template-rows: auto auto;
  gap: 8px 10px;
  align-items: start;

  &:last-child {
    border-bottom: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column: 1;
  grid-row: 1 / span 2;
`;

const Nickname = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #555;
  margin-bottom: 3px;
  text-align: left;
`;

const DateInfo = styled.div`
  font-size: 11px;
  color: #888;
`;

const CommentContent = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  text-align: left;
  grid-column: 2;
  grid-row: 1;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  grid-column: 3;
  grid-row: 1 / span 2; /* 아이콘과 날짜가 같은 컬럼, 다른 행 차지 */
  justify-self: end; /* 오른쪽 끝으로 정렬 */
`;

const IconsWrapper = styled.div`
  display: flex;
  gap: 10px;
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
      color: #871f13;
    }
  }
`;

function Comment({ user, text, date }) {
  return (
    <CommentContainer>
      <UserInfo>
        <Nickname>{user}</Nickname>
        {/* <DateInfo>{date}</DateInfo> UserInfo 영역에서 제거 */}
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
        <DateInfo>{date}</DateInfo> {/* Actions 영역 아래에 DateInfo 배치 */}
      </Actions>
    </CommentContainer>
  );
}

export default Comment;
