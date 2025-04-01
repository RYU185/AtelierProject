import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import TabBar from "./components/TabBar";
import NoticeList from "./components/NoticeList";

function Notice() {
  return (
    <div>
      <Header />
      <h1>Notice</h1>
      <TabBar />
      <NoticeList />
      <Footer />
    </div>
  );
}

export default Notice;
