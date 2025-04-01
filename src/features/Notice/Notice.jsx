import React from "react";
import Header from "../Header";
import Footer from "../Footer";

function Notice() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <Container>
        <NavList>
          <Button onClick={() => navigate("/notice")}>공지사항</Button>
          <Button onClick={() => navigate("/guide")}>시설안내</Button>
          <Button onClick={() => navigate("/contactus")}>오시는 길</Button>
          <Button onClick={() => navigate("/faq")}>고객센터</Button>
        </NavList>

        <Search>
          <Button></Button>
          <Button></Button>
        </Search>

        <NoticeList />
      </Container>

      <Footer />
    </div>
  );
}

export default Notice;
