import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  flex: 1;
  padding: 40px 20px;
  background-color: #f9fafc;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: bold;
`;

const GridContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 230px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: scale(0.98);
  }

  ${({ $active }) =>
    $active &&
    css`
      border: 2px solid #007aff;
      box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
    `}
`;

const IconContainer = styled.div`
  font-size: 2.4rem;
  margin-bottom: 1rem;

  ${({ $type }) =>
    $type === "notice" &&
    css`
      ${Card}:hover & {
        animation: ${shake} 0.4s ease-in-out;
      }
    `}
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-top: 6px;
  line-height: 1.4;
`;

const AccentBar = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${({ color }) => color || "#ccc"};
  border-radius: 4px;
  margin-top: 1.5rem;
`;

const ContentContainer = styled.div`
  margin-top: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 20px;
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const supportItems = [
  {
    id: "notice",
    title: "공지사항",
    description: "새로운 소식을 확인하세요.",
    path: "/support/notice",
    icon: "📢",
    color: "#FF7043",
  },
  {
    id: "guide",
    title: "이용안내",
    description: "이용안내를 확인하세요.",
    path: "/support/guide",
    icon: "📋",
    color: "#29B6F6",
  },
  {
    id: "location",
    title: "오시는 길",
    description: "위치와 교통편을 확인하세요.",
    path: "/support/location",
    icon: "🗺️",
    color: "#66BB6A",
  },
  {
    id: "contactus",
    title: "문의하기",
    description: "궁금한 점을 남겨주세요.",
    path: "/support/contactus",
    icon: "💬",
    color: "#AB47BC",
  },
];

const SupportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Container>
          <Title>고객지원</Title>
          <GridContainer>
            {supportItems.map((item) => (
              <Card
                key={item.id}
                aria-label={`${item.title} - ${item.description}`}
                $active={location.pathname === item.path}
                onClick={() => handleCardClick(item.path)}
              >
                <IconContainer $type={item.id}>{item.icon}</IconContainer>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <AccentBar color={item.color} />
              </Card>
            ))}
          </GridContainer>

          {location.pathname !== "/support" && (
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          )}
        </Container>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default SupportPage;
