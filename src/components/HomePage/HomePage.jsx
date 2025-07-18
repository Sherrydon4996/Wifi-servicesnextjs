"use client";

import Services from "../Service/Service";
import Hero from "./../Hero/Hero";
import Packages from "./../Packages/Packages";
import Testimonials from "./../Testimonials/Testimonials";
import Gallery from "./../Gallery/Gallery";

function HomePageSection() {
  const handleWhatsApp = (
    message = "Hi! I'm interested in your internet packages."
  ) => {
    const phone = "+254700123456";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    // <div className=`{app ${darkMode ? "dark" : ""}` >
    <div>
      <Hero handleWhatsApp={handleWhatsApp} />
      <Services />
      <Packages handleWhatsApp={handleWhatsApp} />
      <Testimonials />
      <Gallery />
    </div>
  );
}

export default HomePageSection;
