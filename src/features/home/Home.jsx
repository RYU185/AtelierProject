import React from "react";
import Header from "../Header";
import WhatsOn from "./components/WhatsOn";
import HighlightExhibition from "./components/HighlightExhibition";
import ThemeGallery from "./components/ThemeGallery";
import ServiceMenu from "./components/ServiceMenu";
import Footer from "../Footer";
import TopButton from "../TopButton";

import styled from "styled-components";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

const Home = () => {
  return (
    <>
      <GradientBackground>
        <Header />
        <WhatsOn />
        <HighlightExhibition />
        <ThemeGallery />
        <ServiceMenu />
        <Footer />
        <TopButton />
      </GradientBackground>
    </>
  );
};

export default Home;
