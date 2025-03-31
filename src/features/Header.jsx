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
  display: flex;
  gap: 80px;
  padding: 14px 60px;
  background-color: rgba(47, 47, 47, 1);
  border-radius: 999px;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
`;

const NavItem = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  transition: 0.2s;
  letter-spacing: 0.5px;

  &:hover {
    color: #60d2ff;
  }
`;

const MenuIcon = styled.div`
  font-weight: bold;
  font-size: 15px;
  padding-left: 10px;
  border-left: 1px solid #666;
  padding: 8px 12px;
  cursor: pointer;
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

const Header = () => {
  const navigate = useNavigate();

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
        <RightNavItem onClick={() => navigate("/join")}>회원가입</RightNavItem>
        <RightNavItem onClick={() => navigate("/login")}>로그인</RightNavItem>
        <RightNavItem onClick={() => navigate("/mypage")}>
          마이페이지
        </RightNavItem>
        <RightNavItem>장바구니</RightNavItem>
        <MenuIcon>MENU</MenuIcon>
      </Right>
    </HeaderWrapper>
  );
};

export default Header;
