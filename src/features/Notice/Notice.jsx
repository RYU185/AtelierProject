import React, { useState } from "react";
import TabBar from "./components/TabBar";
import NoticeList from "./components/NoticeList";

function Notice() {
  const [currentTab, setCurrentTab] = useState("notice");

  return (
    <div className="notice-container">
      <h2>공지사항</h2>
      <TabBar tab={currentTab} setTab={setCurrentTab} />
      <NoticeList />
    </div>
  );
}

export default Notice;
