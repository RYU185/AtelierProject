import { useState } from "react";

const InquiryNotifications = () => {
  const [inquiries, setInquiries] = useState([
    { id: 1, message: "배송 관련 문의", read: false },
    { id: 2, message: "작품 감상 후기 남깁니다!", read: false },
  ]);

  // 읽지 않은 문의 개수 계산
  const unreadCount = inquiries.filter((inquiry) => !inquiry.read).length;

  // 문의 목록 확인 (알림 제거)
  const markAllAsRead = () => {
    setInquiries(inquiries.map((inquiry) => ({ ...inquiry, read: true })));
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* 🔔 알림 아이콘 */}
      <button
        onClick={markAllAsRead}
        style={{
          background: "none",
          top:"90px",
          marginLeft:"2050px",
          border: "none",
          fontSize: "40px",
          cursor: "pointer",
          position:"relative",
          zIndex: "10"
          
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

      {/* 문의 목록 */}
      {unreadCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: "170px",
            right: "0",
            background: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
          }}
        >
          <h4>📩 새로운 문의</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {inquiries.map((inquiry) => (
              <li key={inquiry.id} style={{ padding: "5px 0" }}>
                {inquiry.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InquiryNotifications;
