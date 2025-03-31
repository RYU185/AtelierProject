// src/features/mypage/components/UserInfoCard.jsx

import React from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi"; // 연필 아이콘 사용

const Card = styled.div`
  width: 280px;
  padding: 24px;
  background: #eaf5ff;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.03);
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  border: 3px solid #1890ff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #1890ff;
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const Email = styled.div`
  font-size: 13px;
  color: #555;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-weight: bold;
    color: #666;
    width: 90px;
    display: inline-block;
  }
`;

const UserInfoCard = ({ user }) => {
  return (
    <Card>
      <Profile>
        <Avatar>👤</Avatar>
        <Name>RYU</Name>
        <Email>{user.email}</Email>
      </Profile>

      <Divider />

      <SectionTitle>
        ACCOUNT
        <FiEdit2 size={14} />
      </SectionTitle>

      <InfoList>
        <InfoRow>
          <span>이름</span>
          {user.name}
        </InfoRow>
        <InfoRow>
          <span>연락처</span>
          {user.phone}
        </InfoRow>
        <InfoRow>
          <span>생년월일</span>
          {user.birth}
        </InfoRow>
        <InfoRow>
          <span>이메일</span>
          {user.email}
        </InfoRow>
        <InfoRow>
          <span>주소</span>
          {user.address}
        </InfoRow>
        <InfoRow>
          <span>현재 포인트</span>
          {user.points}
        </InfoRow>
      </InfoList>
    </Card>
  );
};

export default UserInfoCard;
