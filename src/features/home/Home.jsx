import React from "react";
import Header from "./components/Header";
import WhatsOn from "./components/WhatsOn";
import HighlightExhibition from "./components/HighlightExhibition";
import ThemeGallery from "./components/ThemeGallery";
import ServiceMenu from "./components/ServiceMenu";
import Footer from "./components/Footer";
import TopButton from './components/TopButton';

const Home = () => {
  return (
    <>
      <Header />
      <WhatsOn />
      <HighlightExhibition />
      <ThemeGallery />
      <ServiceMenu />
      <Footer />
      <TopButton />
    </>
  );
};

export default Home;
