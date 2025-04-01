import React from "react";
import { Outlet } from "react-router-dom";
import FAQNAVBar from "../Directions/components/FAQNAVBar";
import Header from "../Header";
import Footer from "../Footer";

function FAQ() {
  return (
    <div>
      <Header />
      <FAQNAVBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default FAQ;
