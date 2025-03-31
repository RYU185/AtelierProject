import React from "react";
import Header from "../Header";
import Datecontrol from "./components/Datecontrol";
import ArtistGalleryLsit from "./components/ArtistGalleryLsit";
import Footer from "../Footer";

function ArtistGallery() {
  return (
    <div>
      <Header />
      <Datecontrol />
      <ArtistGalleryLsit />
      <Footer />
    </div>
  );
}

export default ArtistGallery;
