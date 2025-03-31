import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import FAQNAVbar from "./components/FAQNAVbar";
import NoticeList from "./components/NoticeList";

function NoticeMain() {
  return (
    <div>
      <Header />
      <FAQNAVbar />
      <NoticeList />
      <Footer />
    </div>
  );
}

export default NoticeMain;
