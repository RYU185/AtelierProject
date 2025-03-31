import React, { useState } from "react";
import styled from "styled-components";
import DrawingItem from "./DrawingItem";

const Wrapper = styled.div``;

const SearchBox = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

const dummyDrawings = [
  {
    title: "2025년 드로잉 응모전",
    status: "미완료",
    image: "",
  },
  {
    title: "전시 기념 한정 굿즈",
    status: "완료",
    image: "",
  },
  {
    title: "캘리포니아 아트페어",
    status: "완료",
    image: "",
  },
];

const DrawingTab = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyDrawings.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="내가 만든 작품의 제목을 검색할 수 있어요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBox>

      <Grid>
        {filtered.map((item, i) => (
          <DrawingItem key={i} item={item} />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default DrawingTab;
