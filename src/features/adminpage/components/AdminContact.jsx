import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

import styled from "styled-components";

const AdminContactWrapper = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
 margin-top: -60px;
`;

const InquiryList = styled.ul`
  position: relative;
  margin-top: 72px;
  list-style: none;
  padding: 0;
  max-height: 500px;
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
  margin-top: -345px;
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
  margin-top: 20px;
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

let stompClient = null;

function AdminContact() {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태

  // 🔌 WebSocket 연결, 관리자일 때만 실행
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // JWT 토큰 디코딩 예시
      if (decodedToken.isAdmin) {
        setIsAdmin(true); // 관리자가 맞으면 상태 업데이트
      }
    }

    // WebSocket 연결, 이미 연결된 상태에서 추가 연결되지 않도록
    if (isAdmin && !stompClient) {
      const socket = new SockJS("http://localhost:8081/ws");
      stompClient = over(socket);

      stompClient.connect({}, () => {
        console.log("🟢 AdminContact WebSocket 연결 성공");

        stompClient.subscribe("/topic/inquiry", (message) => {
          const data = JSON.parse(message.body);

          const newInquiry = {
            id: Date.now(),
            name: data.sender,
            title: data.message,
            content: "",
            isReplied: false,
            createdAt: new Date().toISOString(),
          };

          setInquiries((prev) => [newInquiry, ...prev]);
        });
      }, (err) => {
        console.error("❌ WebSocket 연결 실패:", err);
      });

      // 컴포넌트 언마운트 시 WebSocket 연결 종료
      return () => {
        if (stompClient) stompClient.disconnect();
        console.log("WebSocket 연결 종료");
      };
    }

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, [isAdmin]);

  // 🧾 초기 문의 목록 API 호출
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/contacts", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        const mapped = data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          title: contact.title,
          content: contact.message,
          isReplied: contact.status !== "대기중",
          createdAt: contact.createdDate,
        }));
        setInquiries(mapped);
      } catch (error) {
        console.error("❌ 문의 목록 불러오기 실패:", error);
      }
    };
    fetchInquiries();
  }, []);

  const sortedInquiries = [...inquiries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredInquiries = sortedInquiries.filter((inquiry) =>
    filter === "unreplied" ? !inquiry.isReplied : true
  );

  const inquiriesToDisplay = filteredInquiries.slice(0, 10); // 10개까지만 표시

  const handleSelectInquiry = (inquiry) => {
    if (selectedInquiry && selectedInquiry.id === inquiry.id) {
      setSelectedInquiry(null);
      setReply("");
    } else {
      setSelectedInquiry(inquiry);
      setReply("");
    }
  };

  return (
    <>
 
 <AdminContactWrapper>
  
        <div style={{ padding: "20px", flex: 1 }}>
          <h2>문의 관리</h2>
          <FilterButtons>
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              전체 문의
            </FilterButton>
            <FilterButton active={filter === "unreplied"} onClick={() => setFilter("unreplied")}>
              미해결 문의만 보기
            </FilterButton>
          </FilterButtons>
          <InquiryList>
            {inquiriesToDisplay.map((inquiry) => (
              <InquiryItem
                key={inquiry.id}
                replied={inquiry.isReplied}
                onClick={() => handleSelectInquiry(inquiry)}
              >
                <div>
                  <span>{inquiry.title} - {inquiry.name}</span>
                  <DateText>{inquiry.createdAt?.split("T")[0]}</DateText>
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
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${selectedInquiry.name}`} />
                <h3>{selectedInquiry.title}</h3>
              </div>
              <p><strong>이름:</strong> {selectedInquiry.name}</p>
              <p><strong>이메일:</strong> {selectedInquiry.email}</p>
              <p><strong>문의 날짜:</strong> {selectedInquiry.createdAt}</p>
              <p><strong>내용:</strong> {selectedInquiry.content}</p>
            </InquiryDetail>
          )}
        </div>
        </AdminContactWrapper>
    </>
  );
}

export default AdminContact;
