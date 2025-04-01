import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import Adminpage from "../features/adminpage/AdminPage";
import Goods from "../features/Goods/Goods";
import GoodsMain from "../features/goodsMain/GoodsMain";
import GoodsDetail from "../features/goodsDetail/GoodsDetail";
import Gallery from "../features/Gallery/Gallery";
import ArtistGallery from "../features/ArtistGallery/ArtistGallery";
import UserGallery from "../features/UserGallery/UserGallery";
import ArtistGalleryDetail from "../features/ArtistGalleryDetail/ArtistGalleryDetail";
import UserGalleryDetail from "../features/UserGalleryDetail/UserGalleryDetail";
import Directions from "../features/Directions/Directions";
import Guide from "../features/Guide/Guide";
import Artist from "../features/Artist/Artist";
import ArtistMain from "../features/artistMain/ArtistMain";
import Community from "../features/Community/Community";
import TicketPage from "../features/ticketpage/TicketPage";
import TicketComplete from "../features/TicketPage/components/TicketComplete";
import Notice from "../features/Notice/Notice";
import AddminArtAdd from "../features/adminpage/components/AdminArtAdd";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/adminpage" element={<Adminpage />} />
      <Route path="/goods" element={<Goods />}>
        <Route index element={<GoodsMain />} />
        <Route path="detail" element={<GoodsDetail />} />
      </Route>
      <Route path="/gallery" element={<Gallery />}>
        <Route index element={<ArtistGallery />} />
        <Route path="artist" element={<ArtistGallery />} />
        <Route path="user" element={<UserGallery />} />
      </Route>
      <Route path="/artist" element={<Artist />}>
        <Route index element={<ArtistMain />} />
      </Route>
      <Route path="/community" element={<Community />}>
        <Route index element={<Community />} />
      </Route>
      <Route path="/guide" element={<Guide />}>
        <Route index element={<Guide />} />
        <Route path="directions" element={<Directions />} />
        <Route path="notice" element={<Notice />} />
      </Route>
      <Route path="/ticketpage" element={<TicketPage />} />
      <Route path="/ticket/complete" element={<TicketComplete />} />
      <Route path="/AdminArtAdd" element={<AddminArtAdd />} />
    </Routes>
  );
};

export default AppRoutes;
