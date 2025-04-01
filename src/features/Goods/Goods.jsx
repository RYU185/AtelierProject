import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Goods = () => {
  return (
    <div>
      <Header />
      <h1>Goods</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Goods;
