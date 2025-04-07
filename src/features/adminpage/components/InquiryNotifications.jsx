import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInquiry } from "./InquiryContext";

const InquiryNotifications = () => {
  const { inquiries, setInquiries } = useInquiry(); // 전역 상태에서 문의 목록 가져오기
  const unreadCount = inquiries.length; // 전체 문의 개수 표시
  const [showList, setShowList] = useState(false); // 문의 목록 표시 여부
  const navigate = useNavigate(); // 페이지 이동 함수

  // 알람 클릭 시 동작
  const handleNotificationClick = () => {
    if (unreadCount > 0) {
      // 문의 목록 초기화
      setInquiries([]);  // inquiries 상태 초기화

      setShowList(false); // 목록 닫기
      navigate("/AdminContact"); // 문의 관리 페이지로 이동
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* 🔔 알림 아이콘 */}
      <button
        onClick={() => setShowList(!showList)} // 클릭하면 목록 보이기/숨기기
        style={{
          background: "none",
          top: "90px",
          marginLeft: "1600px",
          border: "none",
          fontSize: "40px",
          cursor: "pointer",
          position: "relative",
          zIndex: "10",
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "red",
              color: "white",
              fontSize: "12px",
              padding: "3px 6px",
              borderRadius: "50%",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* 문의 목록 (알림 클릭하면 보이기/숨기기) */}
      {showList && unreadCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: "90px",
            marginLeft: "1390px",
            background: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            zIndex: "10",
          }}
        >
          <h4>📩 새로운 문의</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {inquiries.map((inquiry, index) => (
              <li
                key={index}
                style={{ padding: "5px 0", cursor: "pointer" }}
                onClick={handleNotificationClick}
              >
                {inquiry.subject}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InquiryNotifications;