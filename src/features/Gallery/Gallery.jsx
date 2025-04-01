import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Gallery = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
