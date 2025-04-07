import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Menu from "./home/components/Menu";
import LogoExample1 from "../assets/LogoDesign/아틀리에 로고 시안2.svg";
import LogoExample2 from "../assets/LogoDesign/아틀리에 로고 시안3.svg";
import LogoExample3 from "../assets/LogoDesign/아틀리에 로고 시안4.svg";
import LogoExample4 from "../assets/LogoDesign/아틀리에 시안 로고1.svg";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #080101;
  color: #fff;
  z-index: 1000;
  height: 80px;
`;

const HeaderSpacer = styled.div`
  height: 70px;
  width: 100%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(5px);
  transform-origin: top;
  transform: ${(props) => (props.$show ? "scaleY(1)" : "scaleY(0)")};
  transition: transform 0.5s ease;
  z-index: 999;
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
  position: relative;
  background-color: rgba(47, 47, 47, 1);
  border-radius: 25px;
  z-index: 1001;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  padding: 8px 40px;
  list-style: none;
`;

const NavItemContainer = styled.div`
  position: relative;
`;

const NavItem = styled.li`
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  border-radius: 25px;
  padding: 0.1rem 1.2rem;

  &:hover {
    background-color: #0f85b4;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: ${(props) =>
    props.$show ? "translateX(-50%) translateY(0px)" : "translateX(-50%) translateY(-10px)"};
  background-color: rgba(47, 47, 47, 1);
  border-radius: 23px;
  list-style: none;
  display: flex;
  flex-direction: column;
  min-width: 160px;
  margin-top: 20px;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.$show ? "auto" : "none")};
  transition: all 0.3s ease;
  z-index: 1001;
`;

const DropdownItem = styled(NavItem)`
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  color: #f3f3f3;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: #424242;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const RightNavItem = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  transition: 0.5s;

  &:hover {
    color: #60d2ff;
  }
`;

const MenuIcon = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  padding-left: 10px;
  border-left: 1px solid #666;
  padding: 6px 10px;
  cursor: pointer;

  &:hover {
    color: #60d2ff;
  }
`;

// Component --------------------------------------
const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(null);
    }, 300);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    setShowDropdown(null);
  };

  const handleMenuClose = () => setIsMenuOpen(false);

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("username");
      localStorage.removeItem("autoLogin");
      navigate("/login");
    }
  };
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    return () => {};
  }, []);
  const dropdownItems = {
    Gallery: [
      { label: "Artist Gallery", path: "/gallery/artistgallery" },
      { label: "User Gallery", path: "/gallery/usergallery" },
    ],
    Artist: [{ label: "작가 소개", path: "/artist" }],
    Community: [
      { label: "커뮤니티", path: "/community" },
      { label: "나만의 작품 그리기", path: "/drawingcanvas" },
    ],
    Goods: [{ label: "굿즈샵", path: "/goods" }],
    Notice: [
      { label: "공지사항", path: "/support/notice" },
      { label: "이용 안내", path: "/support/guide" },
      { label: "오시는 길", path: "/support/location" },
      { label: "문의하기", path: "/support/contactus" },
    ],
  };
  const mainRoutes = {
    Gallery: "/gallery/artistgallery",
    Artist: "/artist",
    Community: "/community",
    Goods: "/goods",
    Notice: "/support/notice",
  };

  return (
    <>
      <HeaderSpacer />
      <Overlay $show={showDropdown !== null} />
      <HeaderWrapper>
        <Left onClick={() => navigate("/")}>
          <img
            src={LogoExample4}
            alt="아틀리에 로고"
            style={{ height: "70px", objectFit: "contain", overflow:"hidden"}}
          />
        </Left>
        <CenterContainer>
          <NavWrapper>
            <NavList>
              {["Gallery", "Artist", "Community", "Goods", "Notice"].map((menu) => (
                <NavItemContainer
                  key={menu}
                  onMouseEnter={() => handleMouseEnter(menu)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavItem
                    onClick={() => {
                      navigate(mainRoutes[menu]);
                      setShowDropdown(null);
                    }}
                  >
                    {menu}
                  </NavItem>
                  <DropdownMenu
                    $show={showDropdown === menu}
                    onMouseEnter={() => handleMouseEnter(menu)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {dropdownItems[menu].map((item) => (
                      <DropdownItem
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setShowDropdown(null);
                        }}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </NavItemContainer>
              ))}
            </NavList>
          </NavWrapper>
        </CenterContainer>
        <Right>
          {username ? (
            <>
              <RightNavItem>{username}님</RightNavItem>
              <RightNavItem onClick={handleLogout}>로그아웃</RightNavItem>
            </>
          ) : (
            <>
              <RightNavItem onClick={() => navigate("/join")}>회원가입</RightNavItem>
              <RightNavItem onClick={() => navigate("/login")}>로그인</RightNavItem>
            </>
          )}
          <RightNavItem onClick={() => navigate("/mypage")}>마이페이지</RightNavItem>
          <RightNavItem onClick={() => navigate("/adminpage")}>관리자페이지</RightNavItem>
          <RightNavItem onClick={() => navigate("/cart")}>장바구니</RightNavItem>
          <MenuIcon onClick={handleMenuOpen}>MENU</MenuIcon>
        </Right>
      </HeaderWrapper>
      <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
};

export default Header;
