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
  grid-row: 1 / span 2;
  justify-self: end;
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
  color: #6799e5;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #1c4f96;
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

function Comment({ user, text, date, onEdit, onDelete }) {
  return (
    <CommentContainer>
      <UserInfo>
        <Nickname>{user}</Nickname>
      </UserInfo>
      <CommentContent>{text}</CommentContent>
      <Actions>
        <IconsWrapper>
          <ActionButton onClick={onEdit}>
            <FiEdit />
          </ActionButton>
          <ActionButton className="delete" onClick={onDelete}>
            <FiTrash2 />
          </ActionButton>
        </IconsWrapper>
        <DateInfo>{date}</DateInfo>
      </Actions>
    </CommentContainer>
  );
}

export default Comment;
