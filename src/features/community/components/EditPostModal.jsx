import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background: #fff;
  padding: 40px;
  width: 700px;
  border-radius: 20px;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

function EditPostModal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const dummy = JSON.parse(localStorage.getItem("posts")) || [];
    const target = dummy.find((item) => item.id === Number(id));
    setPost(target);
  }, [id]);

  const closeModal = () => {
    navigate("/community");
  };

  if (!post) return null;

  return (
    <Overlay onClick={closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeModal}>×</CloseBtn>
        <h2>수정할 게시물 ID: {id}</h2>
        <p>작성자: {post.nickname}</p>
        <textarea defaultValue={post.content} rows="8" />

        <button>수정 완료</button>
      </Modal>
    </Overlay>
  );
}

export default EditPostModal;
