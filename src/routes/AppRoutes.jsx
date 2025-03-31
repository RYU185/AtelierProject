import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import GoodsMain from "../features/goodsMain/GoodsMain";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/goods" element ={<GoodsMain />} />
    </Routes>
  );
};

export default AppRoutes;
