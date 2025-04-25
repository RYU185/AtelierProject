import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";
import AdminMenu from "./components/AdminMenu";
import AdminArtList from "./components/AdminArtList";
import AdminGoods from "./components/AdminGoods";
import { useLocation } from "react-router-dom";
import AdminGoodsChart from "./components/AdminGoodsChart";
import AdminGoodsAdd from "./components/AdminGoodsAdd";
import AdminTicketManagement from "./components/AdminTicketManagement";
import AdminTicketChart from "./components/AdminTicketChart";
import AdminContact from "./components/AdminContact";
import AdminUser from "./components/AdminUser";
import AdminArtAdd from "./components/AdminArtAdd";
import AdminArtist from "./components/AdminArtist";
import AdminArtistAdd from "./components/AdminArtistAdd";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
`;

const AdminPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialTab = query.get("tab") || "art";

  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const newTab = query.get("tab") || "art";
    setTab(newTab);
  }, [location.search]); 

  const renderComponent = () => {
    switch (tab) {
      case "art":
        return <AdminArtList />;
      case "artAdd":
        return <AdminArtAdd />;
      case "goods":
        return <AdminGoods />;
      case "goodsChart":
        return <AdminGoodsChart />;
      case "goodsAdd":
        return <AdminGoodsAdd />;
      case "ticket":
        return <AdminTicketManagement />;
      case "ticketChart":
        return <AdminTicketChart />;
      case "contact":
        return <AdminContact />;
      case "user":
        return <AdminUser />;
      case "artist":
        return <AdminArtist />;
      case "artistAdd":
        return <AdminArtistAdd />;

      default:
        return <div>선택된 탭이 없습니다</div>;
    }
  };

  return (
    <GradientBackground>
      <Header />
      <Container>
        <Wrapper>
          <AdminMenu tab={tab} setTab={setTab} />
          {renderComponent()}
        </Wrapper>
      </Container>
      <Footer />
    </GradientBackground>
  );
};

export default AdminPage;
