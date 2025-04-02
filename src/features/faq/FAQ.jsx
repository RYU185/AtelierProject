import React from "react";
import { Outlet } from "react-router-dom";
import FAQNAVBar from "./components/FAQNAVBar";
import Header from "../Header";
import Footer from "../Footer";

function FAQ() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default FAQ;
