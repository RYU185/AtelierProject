import React from "react";
import Header from "../Header";
import UserGalleryPoster from "./components/UserGalleryPoster";
import TicketButton from "../ArtistGalleryDetail/components/TicketButton";
import UserGalleryInformation from "./components/UserGalleryInformation";
import DrawingList from "./components/DrawingList";
import Footer from "../Footer";

function UserGalleryDetail() {
  return (
    <div>
      <TitleContainer>
        <BackTitle>ARTIST GALLERY</BackTitle>
        <Title>{gallery?.title || "전시 정보 없음"}</Title>
      </TitleContainer>
      <ButtonDiv>
        <Button onClick={() => navigate("/gallery/usergallery")}>
          {" "}
          &lt; 목록 보기
        </Button>
      </ButtonDiv>
      <Container>
        <PosterBox>
          <UserGalleryPoster />
        </PosterBox>
        <InfoBox>
          <UserGalleryInformation />
        </InfoBox>
      </Container>
      <Box>
        <h1>참여 작품</h1>
        <DrawingList />
      </Box>
    </div>
  );
}

export default UserGalleryDetail;
