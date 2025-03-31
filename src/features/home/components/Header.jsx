import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: relative; /* 중앙 고정 위해 필수 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px;
  background-color: #080101;
  color: #fff;
`;

const Left = styled.div`
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
`;

const CenterContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NavWrapper = styled.div`
  width: 60rem;
  height: 4rem;
  display: flex;
  gap: 80px;
  background-color: rgba(47, 47, 47, 1);
  border-radius: 999px;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: flex-start; // 👈 위쪽 정렬
  gap: 18px;
`;

const NavItem = styled.div`
  font-size: 1.5rem; // ✅ 20px (큰 사이즈)
  font-weight: 600;
  cursor: pointer;
  color: white;
  transition: 0.5s;
  letter-spacing: 0.5px; // ✅ 더 정갈한 느낌
  padding: 0 1rem 0 1rem;

  &:hover {
    color: #ffffff;
    background-color: #40a8d1;
    border: none;
    border-radius: 999px;
  }
`;

const MenuIcon = styled.div`
  font-weight: bold;
  font-size: 15px;
  padding-left: 10px;
  border-left: 1px solid #666;
  padding: 8px 12px;
  cursor: pointer; // ✅ 마우스 올렸을 때 버튼 느낌!
  transition: all 0.2s ease;
  user-select: none;
  margin-top: -33px;

  &:hover {
    color: #60d2ff;
  }
`;

const RightNavItem = styled.div`
  font-size: 15px; // 👉 14px
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  transition: 0.2s;
  margin-top: -25px;

  &:hover {
    color: #60d2ff;
  }
`;

// src/components/Header.jsx ✅ 여기 중요!

const Header = () => {
  const navigate = useNavigate(); // ✅ 훅 선언

  return (
    <HeaderWrapper>
      <Left>LOGO</Left>
      <CenterContainer>
        <NavWrapper>
          <NavItem>Gallery</NavItem>
          <NavItem>Artist</NavItem>
          <NavItem>Community</NavItem>
          <NavItem>Goods</NavItem>
          <NavItem>FAQ</NavItem>
        </NavWrapper>
      </CenterContainer>
      <Right>
        <RightNavItem>회원가입</RightNavItem>
        <RightNavItem onClick={() => navigate("/login")}>로그인</RightNavItem>
        <RightNavItem>마이페이지</RightNavItem>
        <RightNavItem>장바구니</RightNavItem>
        <MenuIcon>MENU</MenuIcon>
      </Right>
    </HeaderWrapper>
  );
};

export default Header;
