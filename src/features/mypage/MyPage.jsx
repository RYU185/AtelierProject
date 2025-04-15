import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import MyTickets from "./components/MyTickets";
import GoodsPurchase from "./components/GoodsPurchase";
import MyDrawing from "./components/MyDrawing";
import RefundModal from "./components/RefundModal";
import TicketCheckModal from "./components/TicketCheckModal";
import EditProfile from "./components/EditProfile";
import { useNavigate, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px 40px;
  flex: 1;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  justify-content: flex-end;
  gap: 1px;
`;

const TabButton = styled.button`
  padding: 16px 40px;
  font-size: 15px;
  border: none;
  background-color: ${(props) => (props.active ? "#4199FF" : "#F1F1F1")};
  color: ${(props) => (props.active ? "#fff" : "#666")};
  cursor: pointer;
  font-weight: 500;
  min-width: 240px;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.active ? "#4199FF" : "#E5E5E5")};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: -8px;
`;

const ProfileSection = styled.div`
  width: 320px;
  background-color: #01acf033;
  padding: 32px;
  border-radius: 4px;
`;

const ProfileCircle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #e1e1e1;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #333;
  background-color: white;
  font-weight: 500;
`;

const AccountEmail = styled.div`
  text-align: center;
  font-size: 13px;
  color: #666;
  margin: 12px 0 32px;
`;

const AccountInfo = styled.div`
  position: relative;
  margin-bottom: 32px;

  &::after {
    content: "";
    position: absolute;
    bottom: -16px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e1e1e1;
  }
`;

const AccountTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileField = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Label = styled.span`
  color: #666;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: #333;
  text-align: right;
  margin-left: 40px;
`;

const Points = styled.div`
  text-align: right;
  color: #333;
  font-size: 14px;
  padding-top: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TicketItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  img {
    width: 80px;
    height: 120px;
    object-fit: cover;
    margin-right: 20px;
  }
`;

const TicketInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 10px 0;
    font-weight: 300;
  }

  p {
    margin: 5px 0;
    color: #666;
    font-weight: 300;
  }
`;

const Price = styled.div`
  color: #333;
  font-weight: 300;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "ticket"
  );
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 초기값 null
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ 토큰 권한 디코딩 로그
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("📦 JWT 권한 (auth):", payload.auth); // ex: ROLE_USER
    } catch (e) {
      console.warn("⚠️ JWT 디코딩 실패:", e);
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user/me");
        setUserInfo(response.data);
      } catch (error) {
        console.error("❌ 사용자 정보 가져오기 실패:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleRefundClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowRefundModal(true);
  };

  const handleCloseTicketModal = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (updatedInfo) => {
    setUserInfo({
      ...userInfo,
      ...updatedInfo,
      points: userInfo.points,
    });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  if (loading || !userInfo) {
    return <div>로딩 중...</div>;
  }

  if (isEditing) {
    return (
      <EditProfile
        userInfo={userInfo}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
      />
    );
  }

  return (
    <Wrapper>
      <Header />
      <PageContainer>
        <PageTitle>마이 페이지</PageTitle>
        <TabContainer>
          <TabButton
            active={activeTab === "ticket"}
            onClick={() => handleTabChange("ticket")}
          >
            나의 티켓 현황
          </TabButton>
          <TabButton
            active={activeTab === "purchase"}
            onClick={() => handleTabChange("purchase")}
          >
            굿즈 구매내역
          </TabButton>
          <TabButton
            active={activeTab === "drawing"}
            onClick={() => handleTabChange("drawing")}
          >
            나의 드로잉
          </TabButton>
        </TabContainer>

        <ContentContainer>
          <ProfileSection>
            <ProfileCircle>{userInfo.nickName[0]}</ProfileCircle>
            <AccountEmail>{userInfo.email}</AccountEmail>
            <AccountInfo>
              <AccountTitle>
                <Title>ACCOUNT</Title>
                <EditButton onClick={handleEditClick}>✎</EditButton>
              </AccountTitle>
              <ProfileInfo>
                <ProfileField>
                  <Label>이름</Label>
                  <Value>{userInfo.realName}</Value>
                </ProfileField>
                <ProfileField>
                  <Label>연락처</Label>
                  <Value>{formatPhoneNumber(userInfo.phone)}</Value>
                </ProfileField>
                <ProfileField>
                  <Label>생년월일</Label>
                  <Value>{userInfo.birthday}</Value>
                </ProfileField>
                <ProfileField>
                  <Label>이메일</Label>
                  <Value>{userInfo.email}</Value>
                </ProfileField>
                <ProfileField>
                  <Label>주소</Label>
                  <Value>{userInfo.address}</Value>
                </ProfileField>
              </ProfileInfo>
            </AccountInfo>
            <Points>적립 포인트: {userInfo.point}</Points>
          </ProfileSection>

          <MainContent>
            {activeTab === "ticket" && (
              <MyTickets
                onTicketClick={handleTicketClick}
                onRefundClick={handleRefundClick}
              />
            )}
            {activeTab === "purchase" && <GoodsPurchase />}
            {activeTab === "drawing" && <MyDrawing />}
          </MainContent>
        </ContentContainer>
      </PageContainer>
      <Footer />

      {showRefundModal && (
        <RefundModal
          ticket={selectedTicket}
          onClose={() => setShowRefundModal(false)}
        />
      )}

      <TicketCheckModal
        isOpen={showTicketModal}
        onClose={handleCloseTicketModal}
        ticketInfo={selectedTicket}
      />
    </Wrapper>
  );
};

export default MyPage;
