import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import AdminPage from "../features/adminpage/AdminPage";
import Goods from "../features/Goods/Goods";
import Gallery from "../features/Gallery/Gallery";
import ArtistGallery from "../features/ArtistGallery/ArtistGallery";
import UserGallery from "../features/UserGallery/UserGallery";
import Artist from "../features/Artist/Artist";
import Community from "../features/Community/Community";
import FAQ from "../features/faq/FAQ";
import Guide from "../features/faq/components/Guide";
import ContactUs from "../features/faq/components/ContactUs";
import Notice from "../features/Notice/Notice";
import TicketPage from "../features/ticketpage/TicketPage";
import TicketComplete from "../features/TicketPage/components/TicketComplete";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/goods" element={<Goods />} />
      <Route path="/gallery" element={<Gallery />}>
        <Route path="artist/:id" element={<ArtistGallery />} />
        <Route path="user/:id" element={<UserGallery />} />
      </Route>
      <Route path="/artist" element={<Artist />} />
      <Route path="/community" element={<Community />} />
      <Route path="/faq" element={<FAQ />}>
        <Route index element={<Guide />} />
        <Route path="guide" element={<Guide />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="notice" element={<Notice />} />
      </Route>
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/ticket/complete" element={<TicketComplete />} />
    </Routes>
  );
}

export default AppRoutes;
