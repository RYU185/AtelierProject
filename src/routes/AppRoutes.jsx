import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import Adminpage from "../features/adminpage/AdminPage"
import GoodsMain from "../features/goodsMain/GoodsMain";
import ArtistGallery from "../features/ArtistGallery/ArtistGallery";
import UserGallery from "../features/UserGallery/UserGallery";
import ArtistGalleryDetail from "../features/ArtistGalleryDetail/ArtistGalleryDetail";
import UserGalleryDetail from "../features/UserGalleryDetail/UserGalleryDetail";
import Directions from "../features/Directions/Directions";
import Guide from "../features/Guide/Guide";
import TicketComplete from "../features/ticket/TicketComplete";
import TicketMain from "../features/ticket/TicketMain";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/adminpage" element={<Adminpage />} />
      <Route path="/goods" element={<GoodsMain />} />
      <Route path="/artistgallery" element={<ArtistGallery />} />
      <Route path="/usergallery" element={<UserGallery />} />
      <Route path="/artistgallerydetail" element={<ArtistGalleryDetail />} />
      <Route path="/usergallerydetail" element={<UserGalleryDetail />} />
      <Route path="/directions" element={<Directions />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/ticket" element={<TicketMain />} />
      <Route path="/ticketcomplete" element={<TicketComplete />}/>
    </Routes>
  );
};

export default AppRoutes;
