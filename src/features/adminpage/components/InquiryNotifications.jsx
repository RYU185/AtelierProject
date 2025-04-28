import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useInquiry } from "./InquiryContext";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../../../socket";

const InquiryNotifications = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { inquiries, setInquiries } = useInquiry();
  const unreadCount = inquiries.length;
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  useWebSocket();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        jwtDecode(token); // 토큰 유효성만 체크
        setIsLoggedIn(true);
      } catch (err) {
        console.error("토큰 디코딩 실패", err);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 🔥 최초 렌더 직후 즉시 실행

    const handleStorageChange = () => {
      checkLoginStatus(); // 스토리지 변경 감지
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      checkLoginStatus();
    }, 30000); // 3초마다 로그인 체크

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    if (unreadCount > 0) {
      setInquiries([]);
      setShowList(false);
      navigate("/AdminContact");
    }
  };

  if (!isLoggedIn || unreadCount === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        right: "40px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setShowList(!showList)}
        style={{
          background: "none",
          border: "none",
          fontSize: "40px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        🔔
        <span
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            background: "red",
            color: "white",
            fontSize: "12px",
            padding: "3px 6px",
            borderRadius: "50%",
          }}
        >
          {unreadCount}
        </span>
      </button>

      {showList && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "0",
            background: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            zIndex: 1001,
          }}
        >
          <h4>📩 새로운 문의</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
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