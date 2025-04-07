import { createContext, useContext, useEffect, useState } from "react";

// Context 생성
const InquiryContext = createContext();

// Context Provider 컴포넌트
export const InquiryProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState(() => {
    // localStorage에서 데이터 불러오기
    const savedInquiries = localStorage.getItem("inquiries");
    return savedInquiries ? JSON.parse(savedInquiries) : [];
  });

  useEffect(() => {
    // inquiries가 변경될 때마다 localStorage에 저장
    localStorage.setItem("inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (newInquiry) => {
    setInquiries((prev) => [...prev, newInquiry]);
  };

  return (
    <InquiryContext.Provider value={{ inquiries, setInquiries, addInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
};

// Context 사용을 쉽게 하기 위한 커스텀 훅
export const useInquiry = () => {
  return useContext(InquiryContext);
};