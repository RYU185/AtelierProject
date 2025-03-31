// src/routes.js
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exhibitions from "./pages/Exhibitions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exhibitions" element={<Exhibitions />} />
      {/* 추가 페이지도 여기에 추가하면 돼요! */}
    </Routes>
  );
};

export default AppRoutes;
