import React from "react";
import NoticeList from "./notice/NoticeList";
import SupportMenu from "./components/SupportMenu";

function NoticePage() {
  return (
    <div className="notice-container">
      <SupportMenu />
      <NoticeList />
    </div>
  );
}

export default NoticePage;
