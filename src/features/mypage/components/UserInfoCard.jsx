import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 260px;
  padding: 24px;
  background: #f6f9fc;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #d4e4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #2b7bb9;
  margin-bottom: 8px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Email = styled.div`
  font-size: 13px;
  color: #666;
`;

const InfoList = styled.div`
  font-size: 13px;
  margin-top: 20px;
`;

const InfoRow = styled.div`
  margin-bottom: 10px;
  line-height: 1.4;

  span {
    font-weight: bold;
    display: inline-block;
    width: 70px;
    color: #444;
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
          <span>포인트</span>
          {user.points}
        </InfoRow>
      </InfoList>
    </Card>
  );
};

export default UserInfoCard;
