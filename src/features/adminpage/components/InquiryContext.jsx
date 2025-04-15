// src/InquiryContext.js
import { createContext, useContext, useEffect, useState } from "react";

// Context 생성
const InquiryContext = createContext();

// Context Provider 컴포넌트
export const InquiryProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState(() => {
    const savedInquiries = localStorage.getItem("inquiries");
    return savedInquiries ? JSON.parse(savedInquiries) : [];
  });

  useEffect(() => {
    localStorage.setItem("inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (newInquiry) => {
    const inquiryToAdd = {
      id: newInquiry.id || Date.now(), // 고유 ID (없으면 timestamp 사용)
      subject: newInquiry.subject || "제목 없음",
      sender: newInquiry.sender || "사용자",
      createdAt: new Date().toISOString(),
    };

    // 중복 여부 확인
    setInquiries((prev) => {
      const isDuplicate = prev.some(
        (inquiry) =>
          inquiry.id === inquiryToAdd.id ||
          (inquiry.subject === inquiryToAdd.subject &&
           inquiry.sender === inquiryToAdd.sender)
      );

      if (!isDuplicate) {
        return [inquiryToAdd, ...prev];
      } else {
        return prev;
      }
    });
  };

  return (
    <InquiryContext.Provider value={{ inquiries, setInquiries, addInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  return useContext(InquiryContext);
};
