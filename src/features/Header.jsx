import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px;
  background-color: #080101;
  color: #fff;
  z-index: 1000;
  transition: all 0.3s ease;
  height: 120px;
`;

const HeaderSpacer = styled.div`
  height: 120px;
  width: 100%;
`;

// 전체화면 덮는 오버레이 z-index 999
// 1000은 헤더
// 1001은 드롭다운
// 나머지 1은 뒤에 있는 포스터 이미지 + 배경
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(5px);
  /* backdrop-filter: blur 라는 기능 기억하기 */
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: all 0.3s ease;
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
  border-radius: 999px;
  transition: all 0.3s ease;
  z-index: 1001;
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
  white-space: nowrap;
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
  white-space: nowrap;

  &:hover {
    color: #60d2ff;
  }
`;

const NavItemContainer = styled.div`
  position: relative;
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
    background-color: #0f85b4;
    color: #ffffff;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  ${({ align }) => {
    switch (align) {
      case "right":
        return "right: 0;";
      // props로 align 줬을때 right면 오른쪽에 맞추기
      case "center":
        return "left: 50%; transform: translateX(-50%);";
      // left : 부모의 중앙 = 왼쪽 끝부터 시작
      // transform : 절반만큼만 왼쪽으로 이동
      default:
        return "left: 0;";
      // props로 align 줬을때 기본 왼쪽에 맞추기
    }
  }}
  background-color: rgba(47, 47, 47, 1);
  border-radius: 999px;
  list-style: none;
  display: flex;
  margin-top: 20px;

  // transition은 display: none -> display: block같은 속성을 처리할수 없다...
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transform: ${(props) => {
    if (props.align === "center") {
      return props.show ? "translateX(-50%) translateY(0px)" : "translateX(-50%) translateY(-10px)";
    }
    return props.show ? "translateY(0px)" : "translateY(-10px)";
  }};
  transition: all 0.3s ease;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  z-index: 1001;
`;

const DropdownItem = styled(NavItem)`
  // 부모 스타일 따라감
  display: block;
  white-space: nowrap;
  font-size: 1rem;
  padding: 0.9rem 3rem;
  position: static;
  transition: 0.5s ease;
  color: #f3f3f3;
  height: 100%;

  &:hover {
    background-color: #424242;
    color: #f3f3f3;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(null);
    }, 200);
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
    // 오버레이만 추가하고 나머지 옮겨넣기
    <>
      <HeaderSpacer />
      <Overlay show={showDropdown !== null} />
      <HeaderWrapper>
        <Left onClick={() => navigate("/")}>LOGO</Left>
        <CenterContainer>
          <NavWrapper>
            <NavList>
              <NavItemContainer
                onMouseEnter={() => handleMouseEnter("Gallery")}
                onMouseLeave={handleMouseLeave}
              >
                <NavItem onClick={() => navigate("/gallery/artistgallery")}>
                  Gallery
                  <DropdownMenu show={showDropdown === "Gallery"}>
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        // 이벤트 버블링 현상
                        // 드롭다운 메뉴를 클릭하면 그 이벤트 대상이 부모요소로 전파되서
                        // 그 어떤 자식을 눌러도 부모 메뉴의 클릭이벤트가 실행되는 문제
                        // stopPropagation()은 이 함수를 막아준다.
                        // 하......
                        navigate("/gallery/artistgallery");
                      }}
                    >
                      Artist Gallery
                    </DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("User Gallery 클릭됨");
                        navigate("/gallery/usergallery");
                      }}
                    >
                      User Gallery
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
              </NavItemContainer>

              <NavItemContainer
                onMouseEnter={() => handleMouseEnter("Artist")}
                onMouseLeave={handleMouseLeave}
              >
                <NavItem onClick={() => navigate("/artist")}>
                  Artist
                  <DropdownMenu show={showDropdown === "Artist"}>
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/artist");
                      }}
                    >
                      작가 소개
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
              </NavItemContainer>

              <NavItemContainer
                onMouseEnter={() => handleMouseEnter("Community")}
                onMouseLeave={handleMouseLeave}
              >
                <NavItem onClick={() => navigate("/community")}>
                  Community
                  <DropdownMenu show={showDropdown === "Community"} align="center">
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/community");
                      }}
                    >
                      Community
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
              </NavItemContainer>

              <NavItemContainer
                onMouseEnter={() => handleMouseEnter("Goods")}
                onMouseLeave={handleMouseLeave}
              >
                <NavItem onClick={() => navigate("/goods")}>
                  Goods
                  <DropdownMenu show={showDropdown === "Goods"} align="right">
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/goods");
                      }}
                    >
                      굿즈샵
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
              </NavItemContainer>

              <NavItemContainer
                onMouseEnter={() => handleMouseEnter("Guide")}
                onMouseLeave={handleMouseLeave}
              >
                <NavItem onClick={() => navigate("/guide")}>
                  Guide
                  <DropdownMenu show={showDropdown === "Guide"} align="right">
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/guide");
                      }}
                    >
                      이용안내
                    </DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/directions");
                      }}
                    >
                      오시는길
                    </DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/notice");
                      }}
                    >
                      공지사항
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
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
    </>
  );
};

export default Header;
