import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  padding: 80px 40px;
  width: 65%;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 40px;
  padding-left: 20px;
  color: #e0e0e0;
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Eng = styled.div`
  font-size: 1.1rem;
  color: #ffffff;
  margin-bottom: 4px;
`;
const Kor = styled.div`
  font-size: 1.42rem;
  font-weight: bold;
  color: #ffffff;
`;

const Card = styled.div`
  flex: 1;
  padding: 32px 16px;
  border-radius: 12px;
  background: #22222237;
  text-align: center;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #0035c5;
    border-color: #f7f7f7;

    ${Eng},${Kor} {
      color: #f7f7f7;
    }
  }
`;
const Icon = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

const services = [
  { title: "공지사항", eng: "NOTICE", icon: "📢", path: "/support/notice" },
  { title: "시설 안내", eng: "GUIDE", icon: "🏢", path: "/support/guide" },
  {
    title: "오시는 길",
    eng: "LOCATION",
    icon: "🗺️",
    path: "/support/Location",
  },
  {
    title: "문의하기",
    eng: "CONTACTUS",
    icon: "💬",
    path: "/support/contactus",
  },
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
