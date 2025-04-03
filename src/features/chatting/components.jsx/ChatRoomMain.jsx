import React from "react";
import UserPage from "./UserPage";

function ChatRoomMain() {
  const url = "http://localhost:8080"; // 개발용 url. 개발 완료시기에는 변경 필요....
  return (
    <>
      <UserPage url={url} />
    </>
  );
}

export default ChatRoomMain;
