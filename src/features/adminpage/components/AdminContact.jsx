import React, { useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import styled from "styled-components";
import AdminMenu from "./AdminMenu";

const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -58px;
  margin-left: 13px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const InquiryList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const InquiryItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #eee;
  }
`;

const InquiryDetail = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #0056b3;
  }
`;

const StatusIcon = styled.span`
  font-size: 18px;
  color: ${(props) => (props.replied ? "gray" : "blue")};
`;

const DateText = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 10px;
`;

function AdminContact() {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState("");
  const [inquiries, setInquiries] = useState([
    { id: 1, name: "김철수", email: "chulsoo@example.com", title: "로그인 문제", content: "로그인이 안 돼요.", isReplied: false, createdAt: "2025-04-03 10:30" },
    { id: 2, name: "이영희", email: "younghee@example.com", title: "회원가입 오류", content: "회원가입이 실패합니다.", isReplied: false, createdAt: "2025-04-02 15:45" },
    { id: 3, name: "박민수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: true, createdAt: "2025-04-01 08:20" },
    { id: 4, name: "박수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: true, createdAt: "2025-04-05 08:20" },
]);

  // 최신 문의가 상단에 오도록 정렬
  const sortedInquiries = inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleSelectInquiry = (inquiry) => {
    if (selectedInquiry && selectedInquiry.id === inquiry.id) {
      setSelectedInquiry(null);
      setReply("");
    } else {
      setSelectedInquiry(inquiry);
      setReply("");
    }
  };

  const handleSendReply = () => {
    if (!reply.trim()) {
      alert("답변을 입력하세요!");
      return;
    }

    alert(`"${selectedInquiry.name}"님에게 답변을 보냈습니다: ${reply}`);

    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === selectedInquiry.id ? { ...inquiry, isReplied: true } : inquiry
      )
    );

    setReply("");
  };

  return (
    <>
      <Header />
      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>
        <Content>
          <h2>문의 관리</h2>
          <InquiryList>
            {sortedInquiries.map((inquiry) => (
              <InquiryItem key={inquiry.id} onClick={() => handleSelectInquiry(inquiry)}>
                <div>
                  <span>{inquiry.title} - {inquiry.name}</span>
                  <DateText>{inquiry.createdAt}</DateText>
                </div>
                <StatusIcon replied={inquiry.isReplied}>
                  {inquiry.isReplied ? "✔️" : "✉️"}
                </StatusIcon>
              </InquiryItem>
            ))}
          </InquiryList>

          {selectedInquiry && (
            <InquiryDetail>
              <h3>{selectedInquiry.title}</h3>
              <p><strong>이름:</strong> {selectedInquiry.name}</p>
              <p><strong>이메일:</strong> {selectedInquiry.email}</p>
              <p><strong>문의 날짜:</strong> {selectedInquiry.createdAt}</p>
              <p><strong>내용:</strong> {selectedInquiry.content}</p>
              <h4>답변 작성</h4>
              <Input
                rows="4"
                placeholder="답변을 입력하세요..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button onClick={handleSendReply}>답변 보내기</Button>
            </InquiryDetail>
          )}
        </Content>
      </Container>
      <Footer />
    </>
  );
}

export default AdminContact;
