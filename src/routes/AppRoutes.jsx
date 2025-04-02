import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import AdminPage from "../features/adminpage/AdminPage";
import Goods from "../features/Goods/Goods";
import GoodsDetail from "../features/Goods/GoodsDetail";
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
import AdminArtAdd from "../features/adminpage/components/AdminArtAdd";
import AdminGoods from "../features/adminpage/components/AdminGoods";
import AdminTicketList from "../features/adminpage/components/AdminTicketList";
import AdminUser from "../features/adminpage/components/AdminUser";
import ArtistGalleryDetail from "../features/ArtistGalleryDetail/ArtistGalleryDetail";
import UserGalleryDetail from "../features/UserGalleryDetail/UserGalleryDetail";
import PurchaseCompletePage from "../features/cart/PurchaseCompletePage";
import DrawingCanvas from "../features/Drawing/DrawingCanvas";
import CartPage from "../features/cart/CartPage";
import AdminGoodsChart from "../features/adminpage/components/AdminGoodsChart";
import NoticeDetail from "../features/Notice/components/NoticeDetail";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/AdminArtAdd" element={<AdminArtAdd />} />
      <Route path="/AdminGoods" element={<AdminGoods />} />
      <Route path="/AdminTicketList" element={<AdminTicketList />} />
      <Route path="/AdminUser" element={<AdminUser />} />
      <Route path="AdminGoodsChart" element={<AdminGoodsChart />} />

     

      <Route path="/goods" element={<Goods />} />
      <Route path="/goods/:id" element={<GoodsDetail />} />

      <Route path="/gallery" element={<Gallery />}>
        <Route path="artistgallery" element={<ArtistGallery />} />
        <Route path="artistgallery/:id" element={<ArtistGalleryDetail />} />
        <Route path="usergallery" element={<UserGallery />} />
        <Route path="usergallery/:id" element={<UserGalleryDetail />} />
      </Route>

      <Route path="/artist" element={<Artist />} />
      <Route path="/community" element={<Community />} />
      <Route path="/faq" element={<FAQ />}>
        <Route index element={<Guide />} />
        <Route path="guide" element={<Guide />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="notice" element={<Notice />} />
        <Route path="notice/:id" element={<NoticeDetail />} />

      </Route>
      
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/ticket/complete" element={<TicketComplete />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/purchase-complete" element={<PurchaseCompletePage />} />
      <Route path="/drawingcanvas" element={<DrawingCanvas />} />
    </Routes>
  );
}

export default AppRoutes;
