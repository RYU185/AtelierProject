import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px;
  background-color: #080101;
  color: #fff;
  overflow: visible;
  z-index: 10;
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
  gap: 2rem;
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
  transition: 0.5s;

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
  border-radius: 99px;
  padding: 0.1rem 1.6rem;

  &:hover {
    background-color: #15b8f8;
    color: #ffffff;
  }
`;

const DropdownMenu = styled.ul`
  margin-top: 20px;
  position: absolute;
  top: 100%;
  ${({ align }) => (align === "right" ? "right: 0;" : "left: 0;")}
  background-color: rgba(47, 47, 47, 1);
  border-radius: 999px;
  list-style: none;
  padding: 1.2rem 3rem;
  gap: 1.25rem;
  display: flex;

  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transform: ${(props) => (props.show ? "translateY(0px)" : "translateY(-10px)")};
  transition: all 0.3s ease;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
`;

const DropdownItem = styled(NavItem)`
  display: block;
  white-space: nowrap; // 스페이스바 섞인거면 줄바꿈 X
  font-size: 1rem;
  padding: 0;
  position: static;
  transition: 0.5s ease;

  &:hover {
    background-color: #666666;
    color: #ffffff;
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
      <Left onClick={() => navigate("/")}>LOGO</Left>
      <CenterContainer>
        <NavWrapper>
          <NavList>
            <NavItem
              onMouseEnter={() => handleMouseEnter("Gallery")}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/artistgallery")}
            >
              Gallery
            </NavItem>
            {showDropdown === "Gallery" && (
              <DropdownMenu
                onMouseEnter={() => handleMouseEnter("Gallery")}
                onMouseLeave={handleMouseLeave}
                align="left"
              >
                <DropdownItem onClick={() => navigate("/artistgallery")}>
                  Artist Gallery
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/usergallery")}>User Gallery</DropdownItem>
              </DropdownMenu>
            )}

            
            <NavItem
              onMouseEnter={() => handleMouseEnter("Artist")}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/artist")}
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
              onClick={() => navigate("/goods")}
            >
              Goods
              <DropdownMenu show={showDropdown === "Goods"} align="right">
                <DropdownItem>Goods Shop</DropdownItem>
              </DropdownMenu>
            </NavItem>
            <NavItem onMouseEnter={() => handleMouseEnter("FAQ")} onMouseLeave={handleMouseLeave}>
              FAQ
              <DropdownMenu show={showDropdown === "FAQ"} align="right">
                <DropdownItem>Notice</DropdownItem>
                <DropdownItem onClick={() => navigate("/guide")}>Guide</DropdownItem>
                <DropdownItem onClick={() => navigate("/directions")}>Directions</DropdownItem>
              </DropdownMenu>
            </NavItem>
          </NavList>
        </NavWrapper>
      </CenterContainer>
      <Right>
        <RightNavItem onClick={() => navigate("/join")}>회원가입</RightNavItem>
        <RightNavItem onClick={() => navigate("/login")}>로그인</RightNavItem>
        <RightNavItem onClick={() => navigate("/mypage")}>마이페이지</RightNavItem>
        <RightNavItem onClick={() => navigate("/adminpage")}> 관리자페이지</RightNavItem>
        <RightNavItem>장바구니</RightNavItem>
        <MenuIcon>MENU</MenuIcon>
      </Right>
    </HeaderWrapper>
  );
};

export default Header;
