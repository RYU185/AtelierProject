import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/components/Login";
import FindId from "../features/home/components/FindId";
import FindPassword from "../features/home/components/FindPassword";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import AdminPage from "../features/adminpage/AdminPage";
import Goods from "../features/Goods/Goods";
import GoodsDetail from "../features/Goods/GoodsDetail";
import Gallery from "../features/Gallery/Gallery";
import ArtistGallery from "../features/ArtistGallery/ArtistGallery";
import UserGallery from "../features/UserGallery/UserGallery";
import Artist from "../features/Artist/Artist";
import ArtistDetail from "../features/Artist/ArtistDetail";
import SupportPage from "../features/support/SupportPage";
import NoticePage from "../features/support/NoticePage";
import GuidePage from "../features/support/GuidePage";
import LocationPage from "../features/support/LocationPage";
import ContactusPage from "../features/support/ContactusPage";
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
import AdminGoodsChart from "../features/adminpage/components/AdminGoodsChart";
import AdminGoodsAdd from "../features/adminpage/components/AdminGoodsAdd";
import NoticeCreate from "../features/support/components/NoticeCreate";
import NoticeDetail from "../features/support/components/NoticeDetail";
import NoticeEdit from "../features/support/components/NoticeEdit";

import CommunityMain from "../features/community/CommunityMain";
import AdminTicketChart from "../features/adminpage/components/AdminTicketChart";
import AdminContact from "../features/adminpage/components/AdminContact";
import ChattingPage from "../features/chatting/pages/ChattingPage";
import CartPage from "../features/cart/CartPage";
import AddPostModal from "../features/community/components/AddPostModal";
import EditPostModal from "../features/community/components/EditPostModal";
import AdminTicketManagement from "../features/adminpage/components/AdminTicketManagement";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/find-id" element={<FindId />} />
      <Route path="/find-password" element={<FindPassword />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/AdminArtAdd" element={<AdminArtAdd />} />
      <Route path="/AdminGoods" element={<AdminGoods />} />
      <Route path="/AdminTicketList" element={<AdminTicketList />} />
      <Route path="/AdminUser" element={<AdminUser />} />
      <Route path="AdminGoodsChart" element={<AdminGoodsChart />} />
      <Route path="AdminGoodsAdd" element={<AdminGoodsAdd />} />
      <Route path="AdminUser" element={<AdminUser />} />
      <Route path="AdminTicketChart" element={<AdminTicketChart />} />
      <Route path="AdminContact" element={<AdminContact />} />
      <Route path="AdminTicketManagement" element={<AdminTicketManagement />} />
      <Route path="/goods" element={<Goods />} />
      <Route path="/goods/:id" element={<GoodsDetail />} />
      <Route path="/gallery" element={<Gallery />}>
        <Route path="artistgallery" element={<ArtistGallery />} />
        <Route path="artistgallery/:id" element={<ArtistGalleryDetail />} />
        <Route path="usergallery" element={<UserGallery />} />
        <Route path="usergallery/:id" element={<UserGalleryDetail />} />
      </Route>
      <Route path="/artist" element={<Artist />} />
      <Route path="/artist/:id" element={<ArtistDetail />} />
      <Route path="/community" element={<CommunityMain />}>
        <Route path="modify/:id" element={<EditPostModal />} />
      </Route>
      <Route path="/add" element={<AddPostModal />} />
      <Route path="/community/:id" element={<CommunityMain />} />
      <Route path="/support" element={<SupportPage />}>
        <Route path="/support/notice" element={<NoticePage />} />
        <Route path="/support/notice/create" element={<NoticeCreate />} />
        <Route path="/support/notice/edit/:id" element={<NoticeEdit />} />
        <Route path="/support/notice/:id" element={<NoticeDetail />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path="location" element={<LocationPage />} />
        <Route path="contactus" element={<ContactusPage />} />
      </Route>
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/ticket/complete" element={<TicketComplete />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/purchase-complete" element={<PurchaseCompletePage />} />
      <Route path="/drawingcanvas" element={<DrawingCanvas />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/artist/:artistId/chat" element={<ChattingPage />} />
    </Routes>
  );
}

export default AppRoutes;
