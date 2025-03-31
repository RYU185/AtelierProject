import React from "react";
import Header from "../Header";
import ArtistGalleryPoster from "./components/ArtistGalleryPoster";
import ArtistGalleryInformation from "./components/ArtistGalleryInformation";
import TicketButton from "./components/TicketButton";
import ArtList from "./components/ArtList";
import Footer from "../Footer";

function ArtistGalleryDetail() {
  return (
    <div>
      <Header />
      <ArtistGalleryPoster />
      <TicketButton />
      <ArtistGalleryInformation />
      <ArtList />
      <Footer />
    </div>
  );
}

export default ArtistGalleryDetail;
