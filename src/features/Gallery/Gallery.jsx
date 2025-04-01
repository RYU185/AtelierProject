import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Gallery = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Gallery 컴포넌트가 렌더링되었습니다.");
    console.log("현재 경로:", location.pathname);
  }, [location]);

  return (
    <>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
