import React from "react";
import Community from "./Community";
import styled from "styled-components";

// 모달 스타일
const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

function CommunityDetail({ post }) {
  return (
    <ModalContainer>
      <Community {...post} />
    </ModalContainer>
  );
}

export default CommunityDetail;
