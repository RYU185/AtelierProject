import React from "react";
import Header from "../../Header";
import WhatsOn from "../../home/components/WhatsOn";
import HighlightExhibition from "../../home/components/HighlightExhibition";
import ThemeGallery from "../../home/components/ThemeGallery";
import ServiceMenu from "../../home/components/ServiceMenu";
import Footer from "../../Footer";
import TopButton from "../../home/components/TopButton";

const FAQNAVbar = () => {
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

export default FAQNAVbar;
