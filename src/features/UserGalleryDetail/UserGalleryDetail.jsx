import React from "react";
import Header from "../Header";
import UserGalleryPoster from "./components/UserGalleryPoster";
import TicketButton from "../ArtistGalleryDetail/components/TicketButton";
import UserGalleryInformation from "./components/UserGalleryInformation";
import DrawingList from "./components/DrawingList";
import Footer from "../Footer";

function UserGalleryDetail() {
  return (
    <div>
      <Header />
      <UserGalleryPoster />
      <TicketButton />
      <UserGalleryInformation />
      <DrawingList />
      <Footer />
    </div>
  );
}

export default UserGalleryDetail;
