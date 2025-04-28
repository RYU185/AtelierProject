// src/InquiryContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useWebSocket from "../../../socket/useWebSocket";

// Context 생성
const InquiryContext = createContext();

// Context Provider 컴포넌트
export const InquiryProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState(() => {
    const savedInquiries = localStorage.getItem("inquiries");
    return savedInquiries ? JSON.parse(savedInquiries) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        jwtDecode(token); // 유효성 확인
        return true;
      }
    } catch {
      return false;
    }
    return false;
  });

  const { client, isConnected } = useWebSocket();

  useEffect(() => {
    if (!client || !isConnected || !isLoggedIn) return;

    const subscription = client.subscribe("/topic/inquiry", (message) => {
      try {
        const inquiry = JSON.parse(message.body);
        console.log("[Inquiry 알림]", inquiry);
        addInquiry(inquiry); //
      } catch (error) {
        console.error("[Inquiry Parsing Error]", error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client, isConnected, isLoggedIn]);

  // 문의 상태 → localStorage 저장
  useEffect(() => {
    localStorage.setItem("inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (newInquiry) => {
    const inquiryToAdd = {
      id: newInquiry.id || Date.now(),
      subject: newInquiry.subject || "제목 없음",
      sender: newInquiry.sender || "사용자",
      createdAt: new Date().toISOString(),
    };

    setInquiries((prev) => {
      const isDuplicate = prev.some(
        (inquiry) =>
          inquiry.id === inquiryToAdd.id ||
          (inquiry.subject === inquiryToAdd.subject && inquiry.sender === inquiryToAdd.sender)
      );
      return isDuplicate ? prev : [inquiryToAdd, ...prev];
    });
  };

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        setInquiries,
        addInquiry,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

// 커스텀 훅
export const useInquiry = () => useContext(InquiryContext);
