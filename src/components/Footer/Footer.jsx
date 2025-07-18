// components/Footer/Footer.jsx
import React from "react";
import {
  FaWifi,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#packages", label: "Packages" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const services = [
    "Home Internet",
    "Business Solutions",
    "CCTV Installation",
    "Technical Support",
    "Network Setup",
    "WiFi Optimization",
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <FaWifi />
              </div>
              <span className={styles.logoText}>KenyaFiber</span>
            </div>
            <p className={styles.companyDescription}>
              Connecting Kenya to the future with fast, reliable internet
              solutions for homes and businesses. Your trusted partner in
              digital connectivity.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.servicesSection}>
            <h3 className={styles.sectionTitle}>Services</h3>
            <ul className={styles.linksList}>
              {services.map((service, index) => (
                <li key={index}>
                  <span className={styles.serviceItem}>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Stay Connected</h3>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaPhoneAlt className={styles.contactIcon} />
                <span>+254 700 123 456</span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>info@kenyafiber.co.ke</span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Westlands, Nairobi</span>
              </div>
            </div>

            <form
              className={styles.newsletterForm}
              onSubmit={handleNewsletterSubmit}
            >
              <h4 className={styles.newsletterTitle}>Newsletter</h4>
              <p className={styles.newsletterText}>
                Subscribe for updates and special offers
              </p>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.subscribeButton}>
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>&copy; {currentYear} KenyaFiber. All rights reserved.</p>
            </div>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>
                Privacy Policy
              </a>
              <a href="#" className={styles.legalLink}>
                Terms of Service
              </a>
              <a href="#" className={styles.legalLink}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Quick Contact */}
      <div className={styles.whatsappQuick}>
        <div className={styles.whatsappContent}>
          <FaWhatsapp className={styles.whatsappIcon} />
          <div className={styles.whatsappText}>
            <span>Need Help?</span>
            <a
              href="https://wa.me/254700123456"
              className={styles.whatsappLink}
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
