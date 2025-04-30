import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useInquiry } from "./InquiryContext";
import { useNavigate } from "react-router-dom";

const InquiryNotifications = () => {
  const { inquiries, setInquiries } = useInquiry();
  const unreadCount = inquiries.length;
  const [showList, setShowList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      try {
        token && jwtDecode(token);
        setIsLoggedIn(!!token);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(checkLoginStatus, 30000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleClick = (inquiry) => {
    if (unreadCount > 0) {
      setInquiries([]);
      setShowList(false);
      navigate("/AdminContact", {
        state: {selectedInquiry: inquiry }
      });
    }
  };

  if (!isLoggedIn || unreadCount === 0) return null;

  return (
    <div style={{ position: "fixed", bottom: "100px", right: "40px", zIndex: 1000 }}>
      <button
        onClick={() => setShowList((prev) => !prev)}
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
            top: "0",
            right: "0",
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
            width: "230px",
            zIndex: 1001,
          }}
        >
          <h4>문의 목록</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {inquiries.map((inquiry, index) => (
              <li key={index}
              onClick={()=>handleClick(inquiry)} 
              style={{ padding: "5px 0", cursor: "pointer" }}
              > 새로운 문의가 도착했습니다!
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
