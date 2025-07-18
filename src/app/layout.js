"use client";

import { useState } from "react";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsApp/WhatsApp";

export const handleWhatsApp = (
  message = "Hi! I'm interested in your internet packages."
) => {
  const phone = "+254700123456";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body className={`app ${darkMode ? "dark" : ""}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleWhatsApp={handleWhatsApp}
        />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton handleWhatsApp={handleWhatsApp} />
      </body>
    </html>
  );
}
