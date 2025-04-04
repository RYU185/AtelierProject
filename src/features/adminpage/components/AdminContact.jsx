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

const Text = styled.h2`
    margin-bottom: 30px;
    font-size: 24px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: 20px;
  margin-left: 13px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const InquiryList = styled.ul`
position: relative;
  list-style: none;
  padding: 0;
  max-height: 400px; /* 최대 높이 설정 (넘치면 스크롤) */
  max-height: 80%;
  width: 650px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

`;
const InquiryItem = styled.li`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  background: ${(props) => (props.replied ? "#f2f2f2" : "rgba(255, 255, 255, 0.9)")}; 
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
 
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
  }
`;


const InquiryDetail = styled.div`
position: relative;
  margin-top: -645px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-left: 700px;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 12px 18px;
  background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: ${(props) => (props.disabled ? "#666" : "white")};
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const StatusIcon = styled.span`
  font-size: 18px;
  color: ${(props) => (props.replied ? "#888" : "#007bff")};
`;

const DateText = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #ddd;
`;
const FilterButtons = styled.div`
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => (props.active ? "#007bff" : "#ddd")};
  color: ${(props) => (props.active ? "white" : "black")};

  &:hover {
    background: ${(props) => (props.active ? "#0056b3" : "#bbb")};
  }
`;
function AdminContact() {
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [reply, setReply] = useState("");
    const [inquiries, setInquiries] = useState([
        { id: 1, name: "김철수", email: "chulsoo@example.com", title: "로그인 문제", content: "로그인이 안 돼요.", isReplied: false, createdAt: "2025-04-03 10:30" },
        { id: 2, name: "이영희", email: "younghee@example.com", title: "회원가입 오류", content: "회원가입이 실패합니다.", isReplied: false, createdAt: "2025-04-02 15:45" },
        { id: 3, name: "박민수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
        { id: 4, name: "김철수", email: "chulsoo@example.com", title: "로그인 문제", content: "로그인이 안 돼요.", isReplied: false, createdAt: "2025-04-03 10:30" },
        { id: 5, name: "이영희", email: "younghee@example.com", title: "회원가입 오류", content: "회원가입이 실패합니다.", isReplied: false, createdAt: "2025-04-02 15:45" },
        { id: 6, name: "박민수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
        { id: 7, name: "김철수", email: "chulsoo@example.com", title: "로그인 문제", content: "로그인이 안 돼요.", isReplied: false, createdAt: "2025-04-03 10:30" },
        { id: 8, name: "이영희", email: "younghee@example.com", title: "회원가입 오류", content: "회원가입이 실패합니다.", isReplied: false, createdAt: "2025-04-02 15:45" },
        { id: 9, name: "박민수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
        { id: 10, name: "김수", email: "chulsoo@example.com", title: "로그인 문제", content: "로그인이 안 돼요.", isReplied: false, createdAt: "2025-04-03 10:30" },
        { id: 11, name: "이희", email: "younghee@example.com", title: "회원가입 오류", content: "회원가입이 실패합니다.", isReplied: false, createdAt: "2025-04-02 15:45" },
        { id: 12, name: "박수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
        { id: 13, name: "박민", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
        { id: 14, name: "철수", email: "chulsoo@example.com", title: "로그인 문제", content: "로그인이 안 돼요.", isReplied: false, createdAt: "2025-04-03 10:30" },
        { id: 15, name: "영희", email: "younghee@example.com", title: "회원가입 오류", content: "회원가입이 실패합니다.", isReplied: false, createdAt: "2025-04-02 15:45" },
        { id: 16, name: "수", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
        { id: 17, name: "수박", email: "minsoo@example.com", title: "비밀번호 변경", content: "비밀번호를 잊어버렸어요.", isReplied: false, createdAt: "2025-04-01 08:20" },
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

        if (selectedInquiry.isReplied) {
            alert("이미 답변한 문의입니다.");
            return;
        }

        alert(`"${selectedInquiry.name}"님에게 답변을 보냈습니다: ${reply}`);

        setInquiries(
            inquiries.map((inquiry) =>
                inquiry.id === selectedInquiry.id ? { ...inquiry, isReplied: true } : inquiry
            )
        );

        // 답변을 보낸 후, 답변창을 닫음
        setReply("");
        setSelectedInquiry(null);

    };
    const [filter, setFilter] = useState("all"); // "all" or "unreplied"

    const filteredInquiries = sortedInquiries.filter((inquiry) =>
        filter === "unreplied" ? !inquiry.isReplied : true
    );
    return (
        <>
            <Header />
            <Container>
                <AdminMenuWrapper>
                    <AdminMenu />
                </AdminMenuWrapper>
                <Content>
                    <Text>문의 관리</Text>
                    <FilterButtons>
                        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                            전체 문의
                        </FilterButton>
                        <FilterButton active={filter === "unreplied"} onClick={() => setFilter("unreplied")}>
                            미해결 문의만 보기
                        </FilterButton>
                    </FilterButtons>
                    <InquiryList>
                    {filteredInquiries.map((inquiry) => (
                            <InquiryItem key={inquiry.id} replied={inquiry.isReplied} onClick={() => handleSelectInquiry(inquiry)}>
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
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${selectedInquiry.name}`} alt="User Avatar" />
                                <h3>{selectedInquiry.title}</h3>
                            </div>

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
                                disabled={selectedInquiry.isReplied}
                            />
                            <Button onClick={handleSendReply} disabled={selectedInquiry.isReplied}>
                                {selectedInquiry.isReplied ? "이미 답변 완료" : "답변 보내기"}
                            </Button>
                        </InquiryDetail>
                    )}
                </Content>
            </Container>
            <Footer />
        </>
    );
}

export default AdminContact;
