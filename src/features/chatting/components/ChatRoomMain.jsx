import React from "react";
import UserPage from "./UserPage";
import { useParams } from "react-router-dom";

function ChatRoomMain() {
  const { artistId } = useParams();
  const artistName = "작가이름";

  const url = "http://localhost:8081"; // 개발용 url. 개발 완료시기에는 변경 필요....
  return (
    <>
      <UserPage url={url} artistId={artistId} artistName={artistName} />
    </>
  );
}

export default ChatRoomMain;
