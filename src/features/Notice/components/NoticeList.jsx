import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import TabBar from "./TabBar";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 60px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

const TabBars = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 300px;
  margin-top: 15px;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #626262;
  padding-left: 40px;
  outline: none;
`;

// 라이브러리 사용 - react-icons
//import { FaSearch } from "react-icons/fa" => Fa:
const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #626262;
  font-size: 16px;
`;

const SortBar = styled.select`
  width: 150px;
  height: 40px;
  margin-top: 15px;
  text-align: center;
  font-size: 15px;
  color: #0068ca;
  border: 1px solid #0068ca;
  border-radius: 2px;
  outline: none;
  /* & > option {
    border-radius: 5px;
  } */
`;
const StyledImg = styled.img`
  width: 30px; /* 이미지 크기 조절 */
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s ease-out-in;

  &:hover {
    transform: scale(0.9); /* 호버 시 크기 확대 */
    /* font-size: 1.1rem; */
    cursor: pointer;
    color: #000;
  }
`;

const NoticeListGrid = styled.div`

`;

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
`;

const Box = styled.button`
  width: 100%;
  display: grid;
  padding: 10px;
  margin: 0 auto;
  grid-template-columns: 25% 65% 10%;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  border-style: none;
  background-color: #fff;
  color: #414141;
  transition: transform 0.2s ease-out-in;

  & > div {
    padding: 8px;
  }
  &:hover {
    transform: scale(1.023); /* 호버 시 크기 확대 */
    font-size: 1.1rem;
    cursor: pointer;
    color: #000;
  }
`;

export default function NoticeList() {
  return (
    <div>
      <TitleContainer>
        <BackTitle>Notice</BackTitle>
        <Title>Notice</Title>
      </TitleContainer>
      <TabBar />
      <TabBars>
        <SearchContainer>
          <SearchIcon />
          <SearchBar placeholder="검색어를 입력하세요" />
        </SearchContainer>
        <SortBar>
          <option value="">정렬</option>
          <option value="price_asc">가격 낮은순</option>
          <option value="price_desc">가격 높은순</option>
        </SortBar>
      </TabBars>
      <NoticeListGrid>
        {Notice.map((Notice) => (
          <Container
            key={Notice.id}
            onClick={() => handleProductClick(Notice.id)}
          >
            <NoticeImage src={Notice.image} alt={Notice.name} />
            <NoticeInfo>
              <NoticeDate>{Notice.date}</NoticeDate>
              <NoticeName>{Notice.name}</NoticeName>
              <NoticeImage>{Notice.image}</NoticeImage>
            </NoticeInfo>
          </Container>
        ))}
      </NoticeListGrid>
      <Container>
        <Box>
          <div>2025.03.03</div>
          <div>업데이트..</div>
          <StyledImg
            src="/src/assets/Icon/bord_right_icon.png"
            alt="이동 아이콘"
            onClick={() => navigate("/NoticeDetail")}
          />
        </Box>
        <hr />
      </Container>
    </div>
  );
}
