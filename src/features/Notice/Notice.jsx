import React, { useState } from "react";
import NoticeList from "./components/NoticeList";
import TopButton from "../home/components/TopButton";

function Notice() {
  const [currentTab, setCurrentTab] = useState("");

  return (
    <div className="notice-container">
      <NoticeList />
      <TopButton />
    </div>
  );
}

export default Notice;
