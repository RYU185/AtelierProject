import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 스타일
const Button = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 12px 18px;
  background-color: #0038a8;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 999;

  &:hover {
    background-color: #0050ff;
  }
`;

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return isVisible && <Button onClick={scrollToTop}>▲ TOP</Button>;
};

export default TopButton;
