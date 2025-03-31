import React from "react";

const Container = styled.div`
  padding: 60px 80px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
`;

function Notice() {
  const [tab, setTab] = useState("ticket");

  return (
    <Container>
      <Title>공지사항</Title>

      <Tabs tab={tab} setTab={setTab} />

      <MainSection></MainSection>
    </Container>
  );
}

export default Notice;
