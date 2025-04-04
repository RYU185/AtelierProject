import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  padding: 80px 40px;
  background: white;
  width: 65%;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 40px;
  padding-left: 20px;
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const Card = styled.div`
  flex: 1;
  padding: 32px 16px;
  border-radius: 12px;
  background: #f2f6ff;
  text-align: center;
  border: 2px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    border-color: #007aff55;
  }
`;
const Icon = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  opacity: 0.6;
`;
const Eng = styled.div`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 4px;
`;
const Kor = styled.div`
  font-size: 1.42rem;
  font-weight: bold;
  color: #333;
`;

const services = [
  { title: "공지사항", eng: "NOTICE", icon: "📢", path: "/support/notice" },
  { title: "시설 안내", eng: "GUIDE", icon: "🏢", path: "/support/guide" },
  {
    title: "오시는 길",
    eng: "CONTACT US",
    icon: "🗺️",
    path: "/support/Location",
  },
  { title: "고객센터", eng: "FAQ", icon: "💬", path: "/support/contactus" },
];

const ServiceMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>시설 안내 및 서비스</Title>
      <CardWrapper>
        {services.map((item, i) => (
          <Card
            key={i}
            onClick={() => {
              setActiveIndex(i);
              navigate(item.path);
            }}
          >
            <Icon>{item.icon}</Icon>
            <Eng>{item.eng}</Eng>
            <Kor>{item.title}</Kor>
          </Card>
        ))}
      </CardWrapper>
    </Wrapper>
  );
};

export default ServiceMenu;
