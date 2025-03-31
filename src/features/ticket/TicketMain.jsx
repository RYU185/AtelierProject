import React from "react";
import styled from "styled-components";
import TicketPoster from "./components/TicketPoster";
import TicketCalendar from "./components/TicketCalendar";
import TicketForm from "./components/TicketForm";

import Header from "../Header";
import Footer from "../Footer";

const Container = styled.div`
  padding: 60px 80px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 40px;
  background-color: #f8faff;
  padding: 40px;
  border-radius: 12px;
`;

const TicketMain = () => {
  return (
    <Container>
      <Header />
      <Title>티켓 구매</Title>

      <Grid>
        <TicketPoster />
        <TicketCalendar />
        <TicketForm />
      </Grid>
      <Footer />
    </Container>
  );
};

export default TicketMain;
