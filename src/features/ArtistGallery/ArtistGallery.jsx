import React from "react";
import Header from "../Header";
import Datacontrol from "./components/Datacontrol";
import ArtistGalleryLsit from "./components/ArtistGalleryLsit";
import Footer from "../Footer";

function ArtistGallery() {
  return (
    <div>
      <Header />
      <Datacontrol />
      <ArtistGalleryLsit />
      <Footer />
    </div>
  );
}

export default ArtistGallery;
