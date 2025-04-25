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
  margin-top: 20px;
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

  // 수정 상태 관련
  const [editMode, setEditMode] = useState(null); // 수정 중인 commentId
  const [editText, setEditText] = useState("");   // 수정용 텍스트

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/community/detail/id/${postId}`);
  
      if (!data.commentUser || !Array.isArray(data.commentText)) {
        console.warn("응답 데이터 누락됨:", data);
        setComments([]);
        setError("댓글 데이터를 불러오는 데 실패했습니다.");
        return;
      }
  
      const fetchedComments = data.commentUser.map((user, index) => ({
        userNickname: user,
        text: data.commentText[index] ?? "",
        creationDate: data.creationDateList?.[index] ?? null,
        id: data.commentIdList?.[index] ?? index,
      }));
  
      setComments(fetchedComments);
    } catch (error) {
      console.error("댓글 목록을 가져오는 중 오류 발생:", error);
      setError("댓글 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `/api/comment/add`,
        {
          text: newCommentText,
          communityId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        await fetchComments();
        setNewCommentText("");
      } else {
        alert("댓글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleCommentUpdate = async (commentId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.put(
            `/api/comment/update/${commentId}`,
            { text: editText, communityId: postId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // JWT 토큰 포함
                },
            }
        );

        if (response.status === 200) {
            await fetchComments();
            setEditMode(null);
            setEditText("");
        } else {
            alert("댓글 수정에 실패했습니다.");
        }
    } catch (error) {
        console.error("댓글 수정 중 오류 발생:", error);
        if (error.response && error.response.status === 403) {
            alert("본인의 댓글만 수정할 수 있습니다.");
        } else {
            alert("댓글 수정 중 오류가 발생했습니다.");
        }
    }
};

  if (loading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <CommentListContainer>
      <CommentTitle>댓글</CommentTitle>
      <hr />
      {comments.length === 0 ? (
        <div>아직 댓글이 없습니다.</div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id}>
            {editMode === comment.id ? (
              <>
                <CommentInput
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <CommentButton onClick={() => handleCommentUpdate(comment.id)}>저장</CommentButton>
                <CommentButton onClick={() => setEditMode(null)}>취소</CommentButton>
              </>
            ) : (
              <Comment
                user={comment.userNickname}
                text={comment.text}
                date={
                  comment.creationDate
                    ? new Date(comment.creationDate).toLocaleString()
                    : ""
                }
                onEdit={() => {
                  setEditMode(comment.id);
                  setEditText(comment.text);
                }}
              />
            )}
          </div>
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
