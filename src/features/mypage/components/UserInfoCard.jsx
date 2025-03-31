import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 280px;
  background: #f1f7ff;
  border-radius: 12px;
  padding: 24px;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background: #ddd;
  border-radius: 50%;
  margin: 0 auto 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: #555;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 16px 0;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 13px;
    color: #666;
  }

  p {
    font-size: 13px;
    font-weight: bold;
    color: #222;
    margin: 0;
  }
`;

const UserInfoCard = ({ user }) => {
  return (
    <Card>
      <ProfileSection>
        <Circle />
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </ProfileSection>

      <Divider />

      <Label>ACCOUNT</Label>

      <InfoGroup>
        <InfoItem>
          <span>이름</span>
          <p>{user.name}</p>
        </InfoItem>
        <InfoItem>
          <span>연락처</span>
          <p>{user.phone}</p>
        </InfoItem>
        <InfoItem>
          <span>생년월일</span>
          <p>{user.birth}</p>
        </InfoItem>
        <InfoItem>
          <span>이메일</span>
          <p>{user.email}</p>
        </InfoItem>
        <InfoItem>
          <span>주소</span>
          <p>{user.address}</p>
        </InfoItem>
        <InfoItem>
          <span>현재 포인트</span>
          <p>{user.points}</p>
        </InfoItem>
      </InfoGroup>
    </Card>
  );
};

export default UserInfoCard;