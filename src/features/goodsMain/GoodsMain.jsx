import React from "react";
import GoodsControl from "./components/GoodsControl";
import GoodsList from "./components/GoodsList";
import Header from "../Header";
import Footer from "../Footer";

function GoodsMain() {
  return (
    <div>
      <Header />
      <GoodsControl />
      <GoodsList />
      <Footer />
    </div>
  );
}

export default GoodsMain;
