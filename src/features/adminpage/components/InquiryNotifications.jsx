import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useInquiry } from "./InquiryContext";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../../../socket";

const InquiryNotifications = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { inquiries, setInquiries } = useInquiry(); // 문의목록 가져옴
  const unreadCount = inquiries.length; // 안 읽은 문의 수
  const [showList, setShowList] = useState(false); // 리스트 열기 닫기
  const navigate = useNavigate();

  useWebSocket(); // 실시간 알림 받기 

  // 🧠 로그인 상태를 확인하는 함수
  const checkAdminStatus = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const roles = decoded.auth || "";
        setIsAdmin(roles.includes("ROLE_ADMIN")); // admin 확인 
      } catch (err) {
        console.error("토큰 디코딩 실패", err);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  // ✅ 토큰이 변경될 때마다 관리자 상태를 다시 체크
  useEffect(() => {
    const handleStorageChange = () => {
      checkAdminStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    checkAdminStatus(); // 최초 한 번 실행

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ 페이지 전환 또는 WebSocket 등에서 토큰 상태 변경 감지
  useEffect(() => {
    const interval = setInterval(() => {
      checkAdminStatus(); // 1초마다 관리자여부 체크 (원하면 3초로 늘릴 수도 있음)
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    if (unreadCount > 0) {
      setInquiries([]); 
      setShowList(false);
      navigate("/AdminContact");
    }
  };

  if (!isAdmin) return null; // 관리자 아니면 렌더링 안함

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShowList(!showList)}
        style={{
          background: "none",
          top: "100px",
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
