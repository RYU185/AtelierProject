import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import Adminpage from "../features/adminpage/AdminPage";
import GoodsMain from "../features/goodsMain/GoodsMain";
import GoodsDetail from "../features/goodsDetail/GoodsDetail";
import ArtistGallery from "../features/ArtistGallery/ArtistGallery";
import UserGallery from "../features/UserGallery/UserGallery";
import ArtistGalleryDetail from "../features/ArtistGalleryDetail/ArtistGalleryDetail";
import UserGalleryDetail from "../features/UserGalleryDetail/UserGalleryDetail";
import Directions from "../features/Directions/Directions";
import Guide from "../features/Guide/Guide";
import ArtistMain from "../features/artistMain/ArtistMain";
import TicketPage from "../features/ticketpage/TicketPage";
import TicketComplete from "../features/TicketPage/components/TicketComplete";
import Notice from "../features/Notice/Notice";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/adminpage" element={<Adminpage />} />
      <Route path="/goods" element={<GoodsMain />} />
      <Route path="/GoodsDetail" element={<GoodsDetail />} />
      <Route path="/artistgallery" element={<ArtistGallery />} />
      <Route path="/usergallery" element={<UserGallery />} />
      <Route path="/artist" element={<ArtistMain />} />
      <Route path="/artistgallerydetail" element={<ArtistGalleryDetail />} />
      <Route path="/usergallerydetail" element={<UserGalleryDetail />} />
      <Route path="/directions" element={<Directions />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/ticketpage" element={<TicketPage />} />
      <Route path="/ticket/complete" element={<TicketComplete />} />
      <Route path="/notice" element={<Notice />} />
    </Routes>
  );
};

export default AppRoutes;
