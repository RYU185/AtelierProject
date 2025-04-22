import React, { useState } from "react";
import Comment from "./Comment";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

const CommentContainer = styled.div`
  width: 90%; /* 너비 조정 */
  padding: 15px; /* 패딩 증가 */
  border-radius: 8px; /* 둥근 모서리 유지 */
  margin: 20px auto; /* 상하 마진 추가 및 중앙 정렬 */
  background: #f9f9f9; /* 밝은 회색 배경 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 댓글 내용이 여러 줄일 때 정렬 */
  padding: 15px 0; /* 상하 패딩 조정 */
  border-bottom: 1px solid #eee; /* 옅은 구분선 */

  &:last-child {
    border-bottom: none; /* 마지막 댓글 구분선 제거 */
  }
`;

const CommentContent = styled.div`
  flex-grow: 1; /* 댓글 내용이 남은 공간 차지 */
  margin-right: 15px; /* 더보기 버튼과의 간격 */
`;

const MoreButton = styled(BsThreeDotsVertical)`
  cursor: pointer;
  font-size: 20px; /* 크기 약간 증가 */
  color: #aaa; /* 색상 변경 */
  position: relative;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50%;
  left: -95px; /* 위치 조정 */
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px; /* 둥근 모서리 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 90px; /* 너비 조정 */
  display: flex;
  flex-direction: column;
`;

const DropdownItemButton = styled.button`
  background: none;
  border: none;
  padding: 10px; /* 패딩 증가 */
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  color: ${(props) => props.color || "#333"}; /* 기본 색상 설정 */
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background: #f0f0f0;
  }
`;

const DropdownItemM = styled(DropdownItemButton)`
  color: #018ec8;
`;

const DropdownItemD = styled(DropdownItemButton)`
  color: #e16060;
`;

const CommentInputContainer = styled.div`
  display: flex;
  margin-top: 20px; /* 마진 증가 */
  padding-top: 15px; /* 패딩 증가 */
  border-top: 1px solid #eee; /* 옅은 구분선 */
`;

const Input = styled.input`
  flex: 1;
  padding: 10px; /* 패딩 증가 */
  border: 1px solid #ddd;
  border-radius: 4px; /* 둥근 모서리 */
  outline: none;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 18px; /* 패딩 조정 */
  margin-left: 10px;
  border-radius: 4px; /* 둥근 모서리 */
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

function CommentList() {
  const [comments, setComments] = useState([
    { nickname: "익명", text: "첫 번째 댓글!", date: "2025-04-04 12:00" },
    { nickname: "익명", text: "안녕하세요!", date: "2025-04-04 12:05" },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [inputText, setInputText] = useState("");

  const handleToggleMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleEdit = (index) => {
    alert(`댓글 ${index + 1} 수정 기능`);
    setActiveIndex(null);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    setComments(comments.filter((_, i) => i !== index));
    setActiveIndex(null);
    alert("댓글이 삭제 되었습니다.");
  };

  const handleSubmit = () => {
    if (!inputText.trim()) {
      alert("댓글을 입력하세요!");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setComments([
      ...comments,
      { nickname: "익명", text: inputText, date: formattedDate },
    ]);
    setInputText("");
  };

  return (
    <CommentContainer>
      {comments.map((comment, index) => (
        <CommentItem key={index}>
          <CommentContent>
            <Comment {...comment} />
          </CommentContent>
          <div style={{ position: "relative" }}>
            {activeIndex === index && (
              <DropdownMenu>
                <DropdownItemM onClick={() => handleEdit(index)}>
                  수정
                </DropdownItemM>
                <DropdownItemD onClick={() => handleDelete(index)}>
                  삭제
                </DropdownItemD>
              </DropdownMenu>
            )}
            <MoreButton onClick={() => handleToggleMenu(index)} />
          </div>
        </CommentItem>
      ))}

      <CommentInputContainer>
        <Input
          placeholder="댓글을 입력해주세요"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </CommentInputContainer>
    </CommentContainer>
  );
}

export default CommentList;
