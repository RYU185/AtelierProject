import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Artist = () => {
  return (
    <div>
      <Header />
      <h1>Artist</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Artist;
