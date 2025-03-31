import React from "react";
import Header from "../Header";
import DataControlUser from "./components/DataControlUser";
import UserGalleryList from "./components/UserGalleryList";
import Footer from "../Footer";

function UserGallery() {
  return (
    <div>
      <Header />
      <DataControlUser />
      <UserGalleryList />
      <Footer />
    </div>
  );
}

export default UserGallery;
