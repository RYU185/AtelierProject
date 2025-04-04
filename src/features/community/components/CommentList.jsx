import React, { useState } from "react";
import Comment from "./Comment";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

const CommentContainer = styled.div`
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0 auto;
  background: #fff;
  margin-top: -30px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #666;
  padding: 15px;
  border-radius: 2px;
  margin: 8px 0;
  position: relative;
`;

const MoreButton = styled(BsThreeDotsVertical)`
  cursor: pointer;
  font-size: 18px;
  color: #666;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50%;
  left: -90px;
  transform: translateY(-50%);
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 80px;
  display: flex;
  flex-direction: column;
`;

const DropdownItemM = styled.button`
  background: none;
  border: none;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  color: #018ec8;

  &:hover {
    background: #f0f0f0;
  }
`;

const DropdownItemD = styled.button`
  background: none;
  border: none;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  color: #e16060;

  &:hover {
    background: #f0f0f0;
  }
`;

const CommentInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;

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
    setComments(comments.filter((_, i) => i !== index));
    setActiveIndex(null);
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
          <Comment {...comment} />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
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
