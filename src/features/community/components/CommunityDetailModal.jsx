import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Community from "./Community";
import CommentList from "./CommentList";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 1300px;
  min-height: 640px;
  position: relative;
  display: flex;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 60px - 250px);
`;

const CommunityWrapper = styled.div`
  flex-shrink: 0;
  overflow-y: auto;
`;

const CommentsWrapper = styled.div`
  width: 550px;
  padding: 30px;
  border-left: 1px solid #e2e8f0;
  max-height: calc(100vh - 60px - 250px);
  overflow-y: auto;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 36px;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    color: #e53e3e;
  }
`;

function CommunityDetailModal({ post, onClose }) {
  const [detailData, setDetailData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  const handleCommentAdded = () => {
    setDetailData((prevData) =>
      prevData
        ? { ...prevData, commentCount: prevData.commentCount + 1 }
        : prevData
    );
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/community/detail/id/${post.id}`);
        const data = response.data;
        setDetailData({
          id: data.id,
          text: data.text,
          img: data.img,
          likes: data.likes,
          uploadDate: data.uploadDate,
          user: { nickname: data.user },
          commentCount: data.commentText?.length || 0, // ✅ 댓글 수 계산
        });
      } catch (error) {
        console.error("❌ 상세 정보 요청 실패:", error);
      }
    };

    if (post?.id) fetchDetail();
  }, [post]);

  const openEditModal = (postToEdit) => {
    setPostToEdit(postToEdit);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setPostToEdit(null);
  };

  const handleEditSubmit = async (updatedPost) => {
    const accessToken = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `/api/community/edit/${updatedPost.id}`,
        { text: updatedPost.text },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setDetailData((prevData) =>
          prevData?.id === updatedPost.id
            ? { ...prevData, text: updatedPost.text }
            : prevData
        );
        closeEditModal();
      } else {
        alert("게시글 수정 실패");
      }
    } catch (error) {
      console.error("게시글 수정 에러:", error);
      alert("게시글 수정 중 오류 발생");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <ContentWrapper>
          {detailData && (
            <CommunityWrapper>
              <Community
                {...detailData}
                user={detailData.user}
                onOpenModal={() => {}}
                onDelete={() => {}}
                isModal={true}
                openEditModal={openEditModal}
              />
            </CommunityWrapper>
          )}
        </ContentWrapper>
        <CommentsWrapper>
          {post && (
            <CommentList postId={post.id} onCommentAdded={handleCommentAdded} />
          )}
        </CommentsWrapper>
      </ModalContent>

      {isEditModalOpen && postToEdit && (
        <EditPostModal
          post={postToEdit}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </ModalOverlay>
  );
}

export default CommunityDetailModal;
