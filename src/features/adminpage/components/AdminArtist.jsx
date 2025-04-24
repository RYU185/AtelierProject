import React from "react";
import Header from "../../Header";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

const AdminArtist = () => {
  return (
    <>
      <Header />

      <Footer />
    </>
  );
};

export default AdminArtist;
