import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-top: 1px solid #eee;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

function CommentList({ postId }) {
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
  ];

  return (
    <CommentSection>
      <Title>댓글</Title>
      <hr />
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      {/* 댓글 작성 폼 추가 (구현 필요) */}
      <div>
        <h4>댓글 작성</h4>
        <textarea style={{ width: "100%", minHeight: "50px" }}></textarea>
        <button>등록</button>
      </div>
    </CommentSection>
  );
}

export default CommentList;
