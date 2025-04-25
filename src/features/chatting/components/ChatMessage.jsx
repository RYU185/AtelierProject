import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$isSender ? "row-reverse" : "row")};
  align-items: flex-end;
  gap: 8px;
  margin: 8px 0;
`;

const ProfileCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isSender ? "#0095E1" : "#f5f5f5")};
  color: ${(props) => (props.$isSender ? "white" : "#666")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isSender ? "flex-end" : "flex-start")};
  gap: 4px;
`;

const MessageBubble = styled.div`
  background: ${(props) => (props.$isSender ? "#0095E1" : "#f0f0f0")};
  color: ${(props) => (props.$isSender ? "#fff" : "#333")};
  padding: 8px 12px;
  border-radius: ${(props) =>
    props.$isSender ? "12px 0 12px 12px" : "0 12px 12px 12px"};
  word-break: break-word;
  font-size: 15px;
  max-width: 600px;
  line-height: 1.4;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
`;

const ProfileName = styled.span`
  color: #666;
  font-weight: 500;
`;

const TimeStamp = styled.span`
  color: #aaa;
`;

const FilePreview = styled.div`
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-size: 13px;
  color: ${(props) => (props.$isSender ? "#333" : "#fff")};
`;

const ChatMessage = ({ message, timestamp, isSender, file, nickname }) => {
  const renderFilePreview = () => {
    if (!file) return null;

    if (file.type?.startsWith("image/")) {
      return (
        <FilePreview>
          <ImagePreview src={URL.createObjectURL(file)} alt="이미지" />
        </FilePreview>
      );
    }

    return <FileInfo $isArtist={isArtist}>📎 {file.name}</FileInfo>;
  };

  const displayNickname =
    nickname && nickname.trim() !== "" ? nickname : "익명";

  return (
    <MessageContainer $isSender={isSender}>
      {isSender && (
        <ProfileCircle $isSender={isSender}>{displayNickname[0]}</ProfileCircle>
      )}
      <MessageContent $isSender={isSender}>
        <MessageInfo>
          <ProfileName>{displayNickname}</ProfileName>
          <TimeStamp>
            {timestamp
              ? new Date(timestamp).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : "??:??"}
          </TimeStamp>
        </MessageInfo>
        <MessageBubble $isSender={isSender}>
          {message}
          {renderFilePreview()}
        </MessageBubble>
      </MessageContent>
      {!isSender  && (
        <ProfileCircle $isSender={isSender}>{displayNickname[0]}</ProfileCircle>
      )}
    </MessageContainer>
  );
};

export default ChatMessage;
