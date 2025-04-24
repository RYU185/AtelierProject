import React, { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-top: 1px solid #eee;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
`;

const CommentForm = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

function CommentList({ postId }) {
  const [newComment, setNewComment] = useState("");
  const comments = [
    {
      id: 1,
      user: "user1",
      text: "첫 번째 댓글입니다.",
      date: "2024.04.24 12:00",
    },
    {
      id: 2,
      user: "user2",
      text: "이 그림 정말 멋지네요!",
      date: "2024.04.24 12:15",
    },
    {
      id: 3,
      user: "user1",
      text: "두 번째 댓글입니다.",
      date: "2024.04.24 12:30",
    },
    {
      id: 4,
      user: "user3",
      text: "저도 그렇게 생각해요!",
      date: "2024.04.24 12:45",
    },
    {
      id: 5,
      user: "user2",
      text: "세 번째 댓글입니다.",
      date: "2024.04.24 13:00",
    },
    {
      id: 5,
      user: "user2",
      text: "세 번째 댓글입니다.",
      date: "2024.04.24 13:00",
    },
    {
      id: 5,
      user: "user2",
      text: "세 번째 댓글입니다.",
      date: "2024.04.24 13:00",
    },
    {
      id: 5,
      user: "user2",
      text: "세 번째 댓글입니다.",
      date: "2024.04.24 13:00",
    },
    {
      id: 5,
      user: "user2",
      text: "세 번째 댓글입니다.",
      date: "2024.04.24 13:00",
    },

    {
      id: 5,
      user: "user2",
      text: "세 번째 댓글입니다.",
      date: "2024.04.24 13:00",
    },
  ];

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    // 실제 댓글 등록 로직 (API 호출 등) 구현 필요
    if (newComment.trim() !== "") {
      console.log("새 댓글 등록:", newComment);
      setNewComment(""); // 입력 필드 초기화
    } else {
      alert("댓글 내용을 입력해주세요.");
    }
  };

  return (
    <CommentSection>
      <Title>댓글</Title>
      <hr />
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}

      <CommentForm>
        <h4>댓글 작성</h4>
        <CommentInput
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성해주세요."
        />
        <SubmitButton onClick={handleSubmitComment}>등록</SubmitButton>
      </CommentForm>
    </CommentSection>
  );
}

export default CommentList;
