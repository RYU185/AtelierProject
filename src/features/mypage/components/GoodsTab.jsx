import React, { useState } from "react";
import styled from "styled-components";
import GoodsItem from "./GoodsItem";

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const dummyGoods = [
  {
    date: "2025.03.02",
    image: "/images/goods1.jpg",
    status: "구매 완료",
    title: "반가사유상 미니어처 ver3 (83호)",
    price: 42000,
    quantity: 1,
  },
];

const GoodsTab = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyGoods.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="구매한 상품을 검색할 수 있어요!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBox>

      <List>
        {filtered.map((item, i) => (
          <GoodsItem key={i} item={item} />
        ))}
      </List>
    </Wrapper>
  );
};

export default GoodsTab;
