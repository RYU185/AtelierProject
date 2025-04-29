import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import axios from "axios";

const CommentContainer = styled.div`
  padding: 12px 0;
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

const EditInput = styled.textarea`
  width: 100%;
  font-size: 14px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  min-height: 60px;
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

function Comment({ user, text, date, commentId, communityId, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const loggedInNickname = localStorage.getItem("nickname");

  const handleEditClick = () => {
    if (user === loggedInNickname) {
      setIsEditing(true);
    } else {
      alert("본인이 작성한 댓글만 수정할 수 있습니다.");
    }
  };

  const handleCancelClick = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const accessToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `/api/comment/update/${commentId}`,
        {
          text: editText,
          communityId: communityId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("✅ 댓글 수정 완료:", response.data);
        setIsEditing(false);
        alert("댓글이 수정되었습니다.");
        if (onUpdate) {
          onUpdate(); // 부모에게 수정 완료 알리기
        }
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteClick = async () => {
    const loggedInNickname = localStorage.getItem("nickname");
    const isAdmin = localStorage.getItem("role") === "ADMIN";

    // 본인이 작성한 댓글만 삭제할 수 있도록 제약
    if (user === loggedInNickname || isAdmin) {
      const confirmDelete = window.confirm(
        "정말로 이 댓글을 삭제하시겠습니까?"
      );

      if (confirmDelete) {
        try {
          // 삭제 요청 보내기
          const accessToken = localStorage.getItem("authToken");

          const response = await axios.post(
            `/api/comment/deleted/${commentId}`, // 엔드포인트
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            console.log("✅ 댓글 삭제 완료:", response.data);
            alert("댓글이 삭제되었습니다.");

            // 댓글 삭제 후 부모 컴포넌트에 알리기 (댓글 목록 새로고침)
            if (onUpdate) {
              onUpdate(); // 댓글 목록 업데이트 함수 호출
            }
          } else {
            alert("댓글 삭제에 실패했습니다.");
          }
        } catch (error) {
          console.error("댓글 삭제 중 오류 발생:", error);
          alert("댓글 삭제 중 오류가 발생했습니다.");
        }
      }
    } else {
      alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
    }
  };

  return (
    <CommentContainer>
      <UserInfo>
        <Nickname>{user}</Nickname>
      </UserInfo>

      {isEditing ? (
        <EditInput
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <CommentContent>{text}</CommentContent>
      )}

      <Actions>
        <IconsWrapper>
          {isEditing ? (
            <>
              <ActionButton onClick={handleSaveClick}>
                <FiCheck />
              </ActionButton>
              <ActionButton onClick={handleCancelClick}>
                <FiX />
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={handleEditClick}>
                <FiEdit />
              </ActionButton>
              <ActionButton className="delete" onClick={handleDeleteClick}>
                <FiTrash2 />
              </ActionButton>
            </>
          )}
        </IconsWrapper>
        <DateInfo>{date}</DateInfo>
      </Actions>
    </CommentContainer>
  );
}

export default Comment;
