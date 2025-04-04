import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import img1 from "../../../assets/images/design.jpg";
import img2 from "../../../assets/images/modern.jpg";
import img3 from "../../../assets/images/tranquil.jpg";
import img4 from "../../../assets/images/minimal.jpg";

// Styled Components
const Wrapper = styled.section`
  position: relative;
  padding: 80px 20px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 100px auto;
  position: relative;
  overflow: visible;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  margin-bottom: 100px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 450px;
  height: 500px;
  object-fit: cover;
  border-radius: 40px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  :hover {
    transform: scale(1.03);
    transition: 0.3s;
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align};
  text-align: ${({ align }) => (align === "flex-start" ? "left" : "right")};
`;

const LabelBox = styled.div`
  margin-top: 16px;
`;

const MainText = styled.div`
  font-weight: bold;
  font-size: 30px;
`;

const Reflection = styled.div`
  font-size: 30px;
  color: #60d2ff;
  transform: scaleY(-1);
  opacity: 0.3;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 3000px;
  background: #007aff;
  transform: translateX(-50%);
  z-index: 0;
`;

const Dot = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #007aff;
  z-index: 2;
  transition: top 0.4s ease, opacity 0.4s ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

const themes = [
  { label: "MODERN", img: img2 },
  { label: "DESIGN", img: img1 },
  { label: "TRANQUIL", img: img3 },
  { label: "MINIMAL", img: img4 },
];

const ThemeGallery = () => {
  const gridRef = useRef(null);
  const [showDot, setShowDot] = useState(false);
  const [dotTop, setDotTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const grid = gridRef.current;
      if (!grid) return;

      const rect = grid.getBoundingClientRect();
      const gridTop = rect.top + scrollY;
      const gridHeight = rect.height;
      const gridBottom = gridTop + gridHeight;
      const middleY = scrollY + window.innerHeight / 2;
      const padding = 200;

      if (middleY >= gridTop + padding &&
        middleY <= gridBottom - padding) {
        setShowDot(true);

        const progress = (middleY - gridTop) / gridHeight;
        const min = 300;
        const max = window.innerHeight - 300;
        const top = min + (max - min) * progress;

        setDotTop(top);
      } else {
        setShowDot(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Line />
      <Dot style={{ top: `${dotTop}px` }} show={showDot} />
      <Grid ref={gridRef}>
        {themes.map((item, i) => (
          <Item
            key={i}
            style={{ flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}
          >
            <ImageBox align={i % 2 === 0 ? "flex-start" : "flex-end"}>
              <Image src={item.img} alt={item.label} />
              <LabelBox>
                <MainText>{item.label}</MainText>
                <Reflection>{item.label}</Reflection>
              </LabelBox>
            </ImageBox>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ThemeGallery;