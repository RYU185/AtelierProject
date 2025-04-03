import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;

  &:before {
    content: "SUPPORT";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-bottom: 40px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const CardDescription = styled.p`
  margin: 5px 0 0;
  font-size: 0.8rem;
  color: #666;
  line-height: 1.2;
`;

const ContentContainer = styled.div`
  margin-top: 40px;
  ${(props) =>
    props.isContactUs
      ? `
    background: transparent;
    box-shadow: none;
    padding: 0;
  `
      : `
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  `}
`;

const SupportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("notice");

  const supportItems = [
    {
      id: "notice",
      title: "공지사항",
      description: "미술관의 새로운 소식과 안내사항을 확인하세요.",
      path: "/support/notice",
      icon: "📢",
    },
    {
      id: "guide",
      title: "이용안내",
      description: "미술관 이용에 대한 안내사항을 확인하세요.",
      path: "/support/guide",
      icon: "📋",
    },
    {
      id: "location",
      title: "오시는 길",
      description: "미술관의 위치와 교통편을 확인하세요.",
      path: "/support/location",
      icon: "🗺️",
    },
    {
      id: "contactus",
      title: "문의하기",
      description: "궁금한 점이나 건의사항을 문의하세요.",
      path: "/support/contactus",
      icon: "💬",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path, { replace: true });
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
                onClick={() => handleCardClick(item.path)}
                isActive={location.pathname === item.path}
              >
                <IconContainer>{item.icon}</IconContainer>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            ))}
          </GridContainer>
          {location.pathname !== "/support" && (
            <ContentContainer
              isContactUs={location.pathname === "/support/contactus"}
            >
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
