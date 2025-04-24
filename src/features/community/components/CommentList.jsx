import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentTitle = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

const CommentInputArea = styled.div`
  display: flex;
  margin-top: 20px; /* 아래 여백 대신 위에 여백 추가 */
`;

const CommentInput = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: vertical;
`;

const CommentButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/community/detail/id/${postId}`);
        const fetchedComments = response.data.commentUser.map(
          (user, index) => ({
            userNickname: user,
            text: response.data.commentText[index],
            creationDate: response.data.creationDateList[index],
            id: index, // 임시 ID
          })
        );
        setComments(fetchedComments);
      } catch (error) {
        console.error("댓글 목록을 가져오는 중 오류 발생:", error);
        setError("댓글 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    } else {
      setComments([]);
      setLoading(false);
    }
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newCommentText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken"); // 토큰 확인 (필요에 따라)
      const response = await axios.post(
        `/api/community/${postId}/comment/add`, // 댓글 추가 API 엔드포인트 (서버와 맞춰야 함)
        { text: newCommentText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 필요한 경우
          },
        }
      );

      if (response.status === 201) {
        fetchComments();
        setNewCommentText("");
      } else {
        alert("댓글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CommentListContainer>
      <CommentTitle>댓글</CommentTitle>
      <hr />
      {comments.length === 0 ? (
        <div>아직 댓글이 없습니다.</div>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            user={comment.userNickname}
            text={comment.text}
            date={
              comment.creationDate
                ? new Date(comment.creationDate).toLocaleString()
                : ""
            }
          />
        ))
      )}
      <CommentInputArea>
        <CommentInput
          placeholder="댓글을 입력하세요"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <CommentButton onClick={handleCommentSubmit}>등록</CommentButton>
      </CommentInputArea>
    </CommentListContainer>
  );
}

export default CommentList;
