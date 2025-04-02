import React, { useState } from "react";
import TabBar from "./components/TabBar";
import NoticeList from "./components/NoticeList";

function Notice() {
  const [currentTab, setCurrentTab] = useState("");

  return (
    <div className="notice-container">
      <NoticeList />
    </div>
  );
}

export default Notice;
