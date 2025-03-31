import React from "react";

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
