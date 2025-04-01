import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Community = () => {
  return (
    <div>
      <Header />
      <h1>Community</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Community;
