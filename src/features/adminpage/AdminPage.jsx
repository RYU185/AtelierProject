import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";
import AdminMenu from "./components/AdminMenu";
import AdminArtList from "./components/AdminArtList";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  padding: 40px 60px;
  min-height: 80vh;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start; /* 사이드바와 컨텐츠 정렬 */
  margin-top: 20px;
`;

const AdminPage = () => {
  const [tab, setTab] = useState("check");

  return (
    <GradientBackground>
      <Header />
      <Container>
        <Wrapper>
          <AdminMenu tab={tab} setTab={setTab} />
          <AdminArtList />
        </Wrapper>
      </Container>
      <Footer />
    </GradientBackground>
  );
};

export default AdminPage;
