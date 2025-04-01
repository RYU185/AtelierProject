import React from "react";
import GoodsControl from "./components/GoodsControl";
import GoodsList from "./components/GoodsList";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";

const H1 = styled.button`
  font-size: 80px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  border: none;
  background-color: #ffffff;
  padding: 50px;
`;

const HR = styled.hr`
    margin-bottom:50px;

`
function GoodsMain() {
  return (
    <div>
      <Header />
      <H1>Gallery Goods</H1>
      <GoodsControl />
      <HR />
      <GoodsList />
      <Footer />
    </div>
  );
}

export default GoodsMain;
