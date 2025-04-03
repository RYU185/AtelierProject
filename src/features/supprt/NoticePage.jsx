import React, { useState } from "react";
import NoticeList from "./components/NoticeList";
import SupportMenu from "./components/SupportMenu";

function NoticePage() {
  const [currentTab, setCurrentTab] = useState("");

  return (
    <div className="notice-container">
      <NoticeList />
      <SupportMenu />
    </div>
  );
}

export default NoticePage;
