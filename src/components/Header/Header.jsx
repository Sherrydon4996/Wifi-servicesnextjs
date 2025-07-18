// components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { FaWifi, FaPhoneAlt, FaWhatsapp, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = ({ darkMode, setDarkMode, handleWhatsApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#packages", label: "Packages" },
    { href: "#services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <FaWifi />
            </div>
            <span className={styles.logoText}>KenyaFiber</span>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button
              onClick={() => handleWhatsApp()}
              className={`${styles.button} ${styles.whatsappButton}`}
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </button>
            <button className={`${styles.button} ${styles.callButton}`}>
              <FaPhoneAlt />
              <span>Call Now</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={styles.themeToggle}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuButton}
          >
            {mobileMenuOpen ? <FaTimes /> : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              {navItems.map((item) =>
                item.href.includes("/") ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a className={styles.mobileNavLink}>{item.label}</a>
                  </Link>
                )
              )}
              <div className={styles.mobileButtons}>
                <button
                  onClick={() => handleWhatsApp()}
                  className={`${styles.button} ${styles.whatsappButton}`}
                >
                  WhatsApp
                </button>
                <button className={`${styles.button} ${styles.callButton}`}>
                  Call Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
