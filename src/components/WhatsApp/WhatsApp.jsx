"use client";


import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import styles from "./WhatsApp.module.css";

const WhatsAppButton = ({ handleWhatsApp }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showQuickChat, setShowQuickChat] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const quickMessages = [
    "I need internet installation",
    "What packages do you have?",
    "I want to upgrade my plan",
    "I need technical support",
    "Request a quote",
  ];

  const handleQuickMessage = (message) => {
    handleWhatsApp(message);
    setShowQuickChat(false);
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <div className={styles.whatsappContainer}>
        <button
          onClick={() => setShowQuickChat(!showQuickChat)}
          className={styles.whatsappButton}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className={styles.whatsappIcon} />
          <div className={styles.ripple}></div>
        </button>

        {/* Tooltip */}
        {showTooltip && !showQuickChat && (
          <div className={styles.tooltip}>
            <span>Need help? Chat with us!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className={styles.tooltipClose}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      {/* Quick Chat Menu */}
      {showQuickChat && (
        <div className={styles.quickChatOverlay}>
          <div className={styles.quickChatMenu}>
            <div className={styles.quickChatHeader}>
              <div className={styles.quickChatTitle}>
                <FaWhatsapp className={styles.quickChatIcon} />
                <span>Quick Chat</span>
              </div>
              <button
                onClick={() => setShowQuickChat(false)}
                className={styles.quickChatClose}
              >
                <FaTimes />
              </button>
            </div>

            <div className={styles.quickChatContent}>
              <p>Choose a quick message or start a custom chat:</p>
              <div className={styles.quickMessages}>
                {quickMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(message)}
                    className={styles.quickMessage}
                  >
                    {message}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleWhatsApp()}
                className={styles.customChatButton}
              >
                Start Custom Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
