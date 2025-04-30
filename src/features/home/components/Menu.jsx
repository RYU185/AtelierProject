import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoIconFinal from "../../LogoIconFinal";

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.6s ease;
  overflow: hidden;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MenuContainer = styled.div`
  max-width: 1400px;
  margin: 80px auto 0;
  padding: 0 80px;
  position: relative;
  z-index: 2001;
`;

const MenuSection = styled.div`
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-20px)"};
  transition: all 0.6s ease;
  transition-delay: ${(props) =>
    props.$isOpen ? props.$index * 0.15 : (4 - props.$index) * 0.1}s;
  padding: 25px 0;
  border-bottom: none;

  &:last-child {
    border-bottom: none;
  }
`;

const MainMenu = styled.h2`
  font-size: 38px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -12px;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.8);
  }

  &:hover {
    color: #60d2ff;
  }
`;

const SubMenuList = styled.div`
  display: flex;
  gap: 70px;
  flex-wrap: nowrap;
  overflow-x: hidden;
  margin-top: 30px;
`;

const SubMenuItem = styled.div`
  font-size: 20px;
  color: rgba(140, 140, 140, 0.9);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;

  &:hover {
    color: #60d2ff;
    transform: translateX(10px);
  }
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 80px;
  z-index: 2001;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-20px)"};
  transition: all 0.6s ease;
  transition-delay: ${(props) => (props.$isOpen ? "0s" : "0.5s")};
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #60d2ff;
  }
  svg {
    height: 80px;
    width: auto;
    scale: 1.5;
    margin-top: -24px;
  }
`;

const LogoNumber = styled.div`
  width: 30px;
  height: 30px;
  background-color: #60d2ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 50px;
  right: 80px;
  background: none;
  border: none;
  color: #fff;
  font-size: 42px;
  cursor: pointer;
  z-index: 2001;
  transition: all 0.6s ease;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.$isOpen
      ? "translateY(0) rotate(0)"
      : "translateY(-20px) rotate(-90deg)"};
  transition-delay: ${(props) => (props.$isOpen ? "0.5s" : "0s")};

  &:hover {
    color: #60d2ff;
    transform: ${(props) =>
      props.$isOpen ? "rotate(90deg)" : "translateY(-20px) rotate(-90deg)"};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Menu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const menuItems = [
    {
      main: "Gallery",
      subs: [
        { name: "AristGallery", path: "/gallery/artistgallery" },
        { name: "UsersGallery", path: "/gallery/usergallery" },
      ],
    },
    {
      main: "Artist",
      subs: [{ name: "AboutArtist", path: "/artist" }],
    },
    {
      main: "Community",
      subs: [
        { name: "Community", path: "/community" },
        { name: "DrawingCanvas", path: "/drawingcanvas" },
      ],
    },
    {
      main: "Goods",
      subs: [{ name: "GalleryGoods", path: "/goods" }],
    },
    {
      main: "고객 지원",
      subs: [
        { name: "공지사항", path: "/support/notice" },
        { name: "이용안내", path: "/support/guide" },
        { name: "오시는 길", path: "/support/location" },
        { name: "문의하기", path: "/support/contactus" },
      ],
    },
  ];

  return (
    <MenuOverlay $isOpen={isOpen}>
      <LogoContainer $isOpen={isOpen}>
        <Logo onClick={() => handleNavigate("/")}>
          <LogoIconFinal width={160} height={80} />
        </Logo>
      </LogoContainer>
      <CloseButton onClick={onClose} $isOpen={isOpen}>
        ×
      </CloseButton>
      <MenuContainer $isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <MenuSection key={item.main} $isOpen={isOpen} $index={index}>
            <MainMenu onClick={() => handleNavigate(item.subs[0].path)}>
              {item.main}
            </MainMenu>
            <SubMenuList>
              {item.subs.map((sub) => (
                <SubMenuItem
                  key={sub.path}
                  onClick={() => handleNavigate(sub.path)}
                >
                  {sub.name}
                </SubMenuItem>
              ))}
            </SubMenuList>
          </MenuSection>
        ))}
      </MenuContainer>
    </MenuOverlay>
  );
};

export default Menu;
