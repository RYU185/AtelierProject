import React from "react";
import { Outlet } from "react-router-dom";
import FAQNAVBar from "../Directions/components/FAQNAVBar";
import Header from "../Header";
import Footer from "../Footer";

function Guide() {
  return (
    <div>
      <Header />
      <FAQNAVBar />
      <Footer />
    </div>
  );
}

export default Guide;
