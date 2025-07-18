"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaBuilding,
  FaWifi,
  FaCheckCircle,
  FaPaperPlane,
  FaExclamationTriangle,
} from "react-icons/fa";
import styles from "./Contact.module.css";
import { handleWhatsApp } from "./../layout";

const Contact = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      package: "",
      serviceType: "home",
    },
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Auto-hide success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const packages = [
    { name: "Starter Home", speed: "5 Mbps", price: "KES 2,500" },
    { name: "Family Plus", speed: "20 Mbps", price: "KES 4,500" },
    { name: "Power User", speed: "50 Mbps", price: "KES 7,500" },
    { name: "Business Pro", speed: "100 Mbps", price: "KES 12,000" },
  ];

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      content: "+254 700 123 456",
      description: "Call us for immediate assistance",
      color: "blue",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      content: "Chat with us",
      description: "Quick response guaranteed",
      color: "green",
      action: () => handleWhatsApp(),
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "info@kenyafiber.co.ke",
      description: "Send us your inquiries",
      color: "red",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Office",
      content: "Westlands, Nairobi",
      description: "Visit our main office",
      color: "purple",
    },
    {
      icon: <FaClock />,
      title: "Hours",
      content: "Mon - Fri: 8AM - 6PM",
      description: "Saturday: 9AM - 4PM",
      color: "orange",
    },
  ];

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      // Check if the response indicates success
      if (response.ok && result.message) {
        setSubmitStatus("success");
        setSubmitMessage(result.message);
        reset(); // Reset the form

        // Also send via WhatsApp
        const whatsappMessage = `
Hello! I'm interested in your services.
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Type: ${data.serviceType}
Package: ${data.package}
Message: ${data.message}
        `;

        setTimeout(() => {
          handleWhatsApp(whatsappMessage.trim());
        }, 1000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        error.message || "Failed to send message. Please try WhatsApp instead."
      );
    }
  };

  const handleQuickContact = (type) => {
    let message = `Hi! I'm interested in ${type} internet services. `;

    switch (type) {
      case "installation":
        message += "I would like to schedule an installation.";
        break;
      case "upgrade":
        message += "I want to upgrade my current plan.";
        break;
      case "support":
        message += "I need technical support.";
        break;
      case "quote":
        message += "Can you provide me with a quote?";
        break;
      default:
        message += "Please contact me with more information.";
    }

    handleWhatsApp(message);
  };

  return (
    <section ref={ref} id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <h2 className={styles.title}>Get Connected Today</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Ready to experience Kenyas fastest internet? Contact us now for
            instant setup.
          </p>
        </div>

        <div className={styles.contactContent}>
          {/* Contact Information */}
          <div
            className={`${styles.contactInfo} ${
              isVisible ? styles.slideInLeft : ""
            }`}
          >
            <h3 className={styles.sectionTitle}>Contact Information</h3>

            <div className={styles.infoGrid}>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`${styles.infoCard} ${styles[info.color]}`}
                  onClick={info.action}
                  style={{
                    cursor: info.action ? "pointer" : "default",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className={styles.infoIcon}>{info.icon}</div>
                  <div className={styles.infoContent}>
                    <h4 className={styles.infoTitle}>{info.title}</h4>
                    <p className={styles.infoText}>{info.content}</p>
                    <span className={styles.infoDescription}>
                      {info.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact Buttons */}
            <div className={styles.quickActions}>
              <h4 className={styles.quickTitle}>Quick Actions</h4>
              <div className={styles.quickButtons}>
                <button
                  onClick={() => handleQuickContact("installation")}
                  className={styles.quickButton}
                >
                  <FaWifi />
                  <span>Request Installation</span>
                </button>
                <button
                  onClick={() => handleQuickContact("upgrade")}
                  className={styles.quickButton}
                >
                  <FaBuilding />
                  <span>Upgrade Plan</span>
                </button>
                <button
                  onClick={() => handleQuickContact("support")}
                  className={styles.quickButton}
                >
                  <FaUser />
                  <span>Get Support</span>
                </button>
                <button
                  onClick={() => handleQuickContact("quote")}
                  className={styles.quickButton}
                >
                  <FaPaperPlane />
                  <span>Get Quote</span>
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className={styles.mapContainer}>
              <h4 className={styles.mapTitle}>Find Us</h4>
              <div className={styles.mapPlaceholder}>
                <FaMapMarkerAlt className={styles.mapIcon} />
                <div className={styles.mapContent}>
                  <h5>KenyaFiber Office</h5>
                  <p>Westlands, Nairobi, Kenya</p>
                  <span>Click to view on Google Maps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`${styles.contactForm} ${
              isVisible ? styles.slideInRight : ""
            }`}
          >
            <h3 className={styles.sectionTitle}>Send us a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`${styles.input} ${
                      errors.name ? styles.inputError : ""
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <span className={styles.errorMessage}>
                      <FaExclamationTriangle />
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`${styles.input} ${
                      errors.email ? styles.inputError : ""
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>
                      <FaExclamationTriangle />
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]+$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    className={`${styles.input} ${
                      errors.phone ? styles.inputError : ""
                    }`}
                    placeholder="+254 700 123 456"
                  />
                  {errors.phone && (
                    <span className={styles.errorMessage}>
                      <FaExclamationTriangle />
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Service Type</label>
                  <select
                    {...register("serviceType")}
                    className={styles.select}
                  >
                    <option value="home">Home Internet</option>
                    <option value="business">Business Internet</option>
                    <option value="enterprise">Enterprise Solution</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Interested Package</label>
                <select {...register("package")} className={styles.select}>
                  <option value="">Select a package</option>
                  {packages.map((pkg, index) => (
                    <option key={index} value={pkg.name}>
                      {pkg.name} - {pkg.speed} - {pkg.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Message *</label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  rows="5"
                  className={`${styles.textarea} ${
                    errors.message ? styles.inputError : ""
                  }`}
                  placeholder="Tell us about your internet needs, preferred installation time, or any specific requirements..."
                />
                {errors.message && (
                  <span className={styles.errorMessage}>
                    <FaExclamationTriangle />
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${
                  isSubmitting ? styles.submitting : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  <FaCheckCircle />
                  <span>{submitMessage}</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className={styles.errorMessage}>
                  <FaExclamationTriangle />
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>

            {/* Alternative Contact */}
            <div className={styles.alternativeContact}>
              <p className={styles.altText}>Prefer instant communication?</p>
              <button
                onClick={() =>
                  handleWhatsApp(
                    "I want to get more information about your internet packages"
                  )
                }
                className={styles.whatsappButton}
              >
                <FaWhatsapp />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`${styles.ctaSection} ${isVisible ? styles.fadeInUp : ""}`}
        >
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
            <p className={styles.ctaText}>
              Join thousands of satisfied customers enjoying fast, reliable
              internet across Kenya.
            </p>
            <div className={styles.ctaButtons}>
              <button
                onClick={() =>
                  handleWhatsApp("I want to schedule an installation")
                }
                className={styles.ctaPrimary}
              >
                <FaWhatsapp />
                <span>Schedule Installation</span>
              </button>
              <button
                onClick={() => handleQuickContact("quote")}
                className={styles.ctaSecondary}
              >
                <FaPhoneAlt />
                <span>Get Free Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
