import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";

import styled from "styled-components";

const AdminContactWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Title = styled.h2`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const InquiryList = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  max-height: 500px;
  width: 650px;
  overflow-y: auto;
  border: 1px solidrgba(67, 67, 67, 0.11);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: rgba(65, 65, 65, 0.07);
`;

const InquiryItem = styled.li`
  padding: 12px 15px;
  border-bottom: 1px solid rgb(76, 76, 76);
  background: ${(props) =>
    props.replied ? "#f2f2f2" : "rgba(255, 255, 255, 0.07)"};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
    color: #000000;
  }
`;

const InquiryDetail = styled.div`
  position: relative;
  margin-top: -31.25rem;
  margin-right: 1.875rem;
  padding: 1.875rem;
  height: 500px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-left: 43.125rem;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #f0f0f0;
  margin-bottom: 12px;

  strong {
    font-weight: 600;
    color: #ffffff;
    margin-right: 6px;
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
  margin-bottom: 20px;
`;

let stompClient = null;

function AdminContact() {
  const location = useLocation();
  const preSelectedInquiry = location.state?.selectedInquiry || null;

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태

  useEffect(() => {
    if (preSelectedInquiry && inquiries.length > 0) {
      const matched = inquiries.find((q) => q.id === preSelectedInquiry.id);
      if (matched) {
        setSelectedInquiry(matched);
      }
    }
  }, [inquiries, preSelectedInquiry]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }
    }

    if (isAdmin && !stompClient) {
      const socket = new SockJS("/ws");
      stompClient = over(socket);

      stompClient.connect(
        {},
        () => {
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
        },
        (err) => {
          console.error("❌ WebSocket 연결 실패:", err);
        }
      );

      // 컴포넌트 언마운트 시 WebSocket 연결 종료
      return () => {
        if (stompClient) stompClient.disconnect();
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
        const res = await fetch("/api/contacts", {
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

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <AdminContactWrapper>
        <div>
          <Title>문의 관리</Title>
          <InquiryList>
            {inquiriesToDisplay.map((inquiry) => (
              <InquiryItem
                key={inquiry.id}
                replied={inquiry.isReplied}
                onClick={() => handleSelectInquiry(inquiry)}
              >
                <div>
                  <span>
                    {inquiry.title} - {inquiry.name}
                  </span>
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
                <Avatar
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${selectedInquiry.name}`}
                />
                <h3>{selectedInquiry.title}</h3>
              </div>
              <Paragraph>
                <strong>이름:</strong> {selectedInquiry.name}
              </Paragraph>
              <Paragraph>
                <strong>이메일:</strong> {selectedInquiry.email}
              </Paragraph>
              <Paragraph>
                <strong>문의 날짜:</strong>{" "}
                {formatDateTime(selectedInquiry.createdAt)}
              </Paragraph>
              <Paragraph>
                <strong>내용:</strong> {selectedInquiry.content}
              </Paragraph>
            </InquiryDetail>
          )}
        </div>
      </AdminContactWrapper>
    </>
  );
}

export default AdminContact;
