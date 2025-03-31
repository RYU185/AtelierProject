import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  height: 250px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px;
  background-color: #080101;
  color: #fff;
  overflow: visible;
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
  justify-content: center;
  align-items: center;
  background-color: rgba(47, 47, 47, 1);
  border-radius: 999px;
  margin: 0 auto;
`;

const NavList = styled.ul`
  display: flex;
  gap: 80px;
  padding: 14px 60px;
  list-style: none;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const MenuIcon = styled.div`
  font-weight: bold;
  font-size: 15px;
  padding-left: 10px;
  border-left: 1px solid #666;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #60d2ff;
  }
`;

const RightNavItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  transition: 0.2s;

  &:hover {
    color: #60d2ff;
  }
`;

const NavItem = styled.li`
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  transition: 0.2s;
  position: relative;

  &:hover {
    color: #60d2ff;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(47, 47, 47, 1);
  border-radius: 5px;
  padding: 10px;
  list-style: none;
  display: ${(props) => (props.show ? "flex" : "none")};
  gap: 20px;
  z-index: 10;
`;

const DropdownItem = styled(NavItem)`
  // NavItem 스타일 재사용
  font-size: 1rem; // 크기 조정
  padding: 0; // 패딩 제거
  position: static; // position 속성 제거
  &:hover {
    color: #60d2ff;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);

  const handleMouseEnter = (itemName) => {
    setShowDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  return (
    <HeaderWrapper>
      <Left>LOGO</Left>
      <CenterContainer>
        <NavWrapper>
          <NavList>
            <NavItem
              onMouseEnter={() => handleMouseEnter("Gallery")}
              onMouseLeave={handleMouseLeave}
            >
              Gallery
              <DropdownMenu show={showDropdown === "Gallery"}>
                <DropdownItem onClick={() => navigate("/artistgallery")}>
                  Artist Gallery
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/usergallery")}>
                  User Gallery
                </DropdownItem>
              </DropdownMenu>
            </NavItem>
            <NavItem
              onMouseEnter={() => handleMouseEnter("Artist")}
              onMouseLeave={handleMouseLeave}
            >
              Artist
              <DropdownMenu show={showDropdown === "Artist"}>
                <DropdownItem>작가 소개</DropdownItem>
              </DropdownMenu>
            </NavItem>
            <NavItem
              onMouseEnter={() => handleMouseEnter("Community")}
              onMouseLeave={handleMouseLeave}
            >
              Community
              <DropdownMenu show={showDropdown === "Community"}>
                <DropdownItem>Community</DropdownItem>
              </DropdownMenu>
            </NavItem>
            <NavItem
              onMouseEnter={() => handleMouseEnter("Goods")}
              onMouseLeave={handleMouseLeave}
            >
              Goods
              <DropdownMenu show={showDropdown === "Goods"}>
                <DropdownItem>Goods Shop</DropdownItem>
              </DropdownMenu>
            </NavItem>
            <NavItem
              onMouseEnter={() => handleMouseEnter("FAQ")}
              onMouseLeave={handleMouseLeave}
            >
              FAQ
              <DropdownMenu show={showDropdown === "FAQ"}>
                <DropdownItem>Notice</DropdownItem>
                <DropdownItem>Guide</DropdownItem>
                <DropdownItem>Contact Us</DropdownItem>
              </DropdownMenu>
            </NavItem>
          </NavList>
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
