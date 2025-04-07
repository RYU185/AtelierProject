import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
`;

function AddPostModal({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <h3>NAME or ID</h3>
        <p>2025.03.27 12:00</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <div
          style={{
            width: "150px",
            height: "150px",
            background: "#ccc",
            margin: "20px auto",
          }}
        />
        <input type="file" style={{ marginBottom: "20px" }} />
        <button style={{ padding: "10px 20px" }}>등록</button>
      </Modal>
    </Overlay>
  );
}

export default AddPostModal;
