import React from "react";
import { Link, useLocation } from "react-router-dom";

function FAQNAVBar() {
  const location = useLocation();

  return (
    <nav className="faq-nav">
      <ul>
        <li>
          <Link to="/faq/guide" className={location.pathname === "/faq/guide" ? "active" : ""}>
            이용 안내
          </Link>
        </li>
        <li>
          <Link
            to="/faq/contactus"
            className={location.pathname === "/faq/contactus" ? "active" : ""}
          >
            문의하기
          </Link>
        </li>
        <li>
          <Link to="/faq/notice" className={location.pathname === "/faq/notice" ? "active" : ""}>
            공지사항
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default FAQNAVBar;
