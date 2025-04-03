import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  
  &::after {
    content: 'SUPPORT';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
    color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
`;

const MenuItem = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background: none;
  border: none;
  color: ${props => props.active ? '#007AFF' : '#666'};
  cursor: pointer;
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #007AFF;
    }
  `}

  &:hover {
    color: #007AFF;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 40px;
`;

const Card = styled(Link)`
  text-decoration: none;
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 40px;
    height: 40px;
    color: #007AFF;
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

const SupportPage = () => {
  const [activeMenu, setActiveMenu] = useState('공지사항');
  const navigate = useNavigate();

  

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.name);
    navigate(menu.path);
  };

  const supportItems = [
    {
      title: '공지사항',
      description: '센터의 주요 소식과 공지사항을 확인하실 수 있습니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      path: '/support/notice'
    },
    {
      title: '시설 안내',
      description: '센터의 시설 정보와 이용 안내를 확인하실 수 있습니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      path: '/support/guide'
    },
    {
      title: '오시는 길',
      description: '센터의 위치와 교통편을 확인하실 수 있습니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/support/location'
    },
    {
      title: '문의하기',
      description: '궁금하신 사항을 문의하실 수 있습니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      path: '/support/contact'
    }
  ];

  return (
    <>
      <Header />
      <Container>
        <Title>고객지원</Title>
        
        <GridContainer>
          {supportItems.map((item, index) => (
            <Card key={index} to={item.path}>
              <IconContainer>
                {item.icon}
              </IconContainer>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </GridContainer>
        <Outlet />
      </Container>
    </>
  );
};

export default SupportPage;
