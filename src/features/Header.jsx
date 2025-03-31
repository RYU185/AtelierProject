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

const NavItemContainer = styled.div`
  position: relative;
`;

const HoverArea = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 20px;
  background: transparent;
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
  position: absolute;
  top: 100%;
  ${({ align }) => (align === "right" ? "right: 0;" : "left: 0;")}
  background-color: rgba(47, 47, 47, 1);
  border-radius: 999px;
  list-style: none;
  padding: 0.9rem 3rem;
  gap: 1.25rem;
  display: flex;
  margin-top: 20px;

  //transition은 display: none -> display: block같은 속성에는 애니메이션이 적용되지 않는다
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transform: ${(props) => (props.show ? "translateY(0px)" : "translateY(-10px)")};
  transition: all 0.3s ease;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};

  &::before {
    content: "";
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    height: 30px;
    background: transparent;
  }
`;

const DropdownItem = styled(NavItem)`
  display: block;
  white-space: nowrap;
  font-size: 1rem;
  padding: 0.5rem 2rem;
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
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
    setShowDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setShowDropdown(null);
      }
    }, 50);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setShowDropdown(null);
      }
    }, 50);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowDropdown(null);
    };
  }, []);

  return (
    <HeaderWrapper>
      <Left onClick={() => navigate("/")}>LOGO</Left>
      <CenterContainer>
        <NavWrapper>
          <NavList>
            <NavItemContainer
              onMouseEnter={() => handleMouseEnter("Gallery")}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem onClick={() => navigate("/artistgallery")}>Gallery</NavItem>
              <HoverArea
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              />
              <DropdownMenu show={showDropdown === "Gallery"}>
                <DropdownItem onClick={() => navigate("/artistgallery")}>
                  Artist Gallery
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/usergallery")}>User Gallery</DropdownItem>
              </DropdownMenu>
            </NavItemContainer>

            <NavItemContainer
              onMouseEnter={() => handleMouseEnter("Artist")}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem onClick={() => navigate("/artist")}>Artist</NavItem>
              <HoverArea
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              />
              <DropdownMenu show={showDropdown === "Artist"}>
                <DropdownItem>작가 소개</DropdownItem>
              </DropdownMenu>
            </NavItemContainer>

            <NavItemContainer
              onMouseEnter={() => handleMouseEnter("Community")}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem>Community</NavItem>
              <HoverArea
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              />
              <DropdownMenu show={showDropdown === "Community"}>
                <DropdownItem>Community</DropdownItem>
              </DropdownMenu>
            </NavItemContainer>

            <NavItemContainer
              onMouseEnter={() => handleMouseEnter("Goods")}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem onClick={() => navigate("/goods")}>Goods</NavItem>
              <HoverArea
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              />
              <DropdownMenu show={showDropdown === "Goods"} align="right">
                <DropdownItem onClick={()=> navigate("/goods")}>Goods Shop</DropdownItem>
              </DropdownMenu>
            </NavItemContainer>

            <NavItemContainer
              onMouseEnter={() => handleMouseEnter("FAQ")}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem>FAQ</NavItem>
              <HoverArea
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              />
              <DropdownMenu show={showDropdown === "FAQ"} align="right">
                <DropdownItem onClick={()=> navigate("/notice")}>Notice</DropdownItem>
                <DropdownItem onClick={() => navigate("/guide")}>Guide</DropdownItem>
                <DropdownItem onClick={() => navigate("/directions")}>Directions</DropdownItem>
              </DropdownMenu>
            </NavItemContainer>
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
