"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaCheck,
  FaWifi,
  FaRocket,
  FaCrown,
  FaBuilding,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import styles from "./Packages.module.css";

const Packages = ({ handleWhatsApp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    packageName: "",
    packageSpeed: "",
    packagePrice: "",
  });

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Enhanced scroll prevention
  useEffect(() => {
    if (modalOpen) {
      // Store current scroll position in ref
      scrollPositionRef.current = window.scrollY;

      // Prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%"; // Prevent layout shift

      // Focus the first input when modal opens
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);
    } else {
      // Restore scrolling
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      // Restore scroll position using stored ref value
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      // Cleanup on component unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, [modalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && modalOpen) {
        handleCloseModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen]);

  const packages = [
    {
      name: "Starter Home",
      icon: <FaWifi />,
      speed: "5 Mbps",
      price: "KES 2,500",
      originalPrice: "KES 3,000",
      features: [
        "Perfect for 1-2 devices",
        "Basic streaming",
        "Email and social media",
        "Free router included",
        "24/7 customer support",
      ],
      popular: false,
      color: "blue",
    },
    {
      name: "Family Plus",
      icon: <FaRocket />,
      speed: "20 Mbps",
      price: "KES 4,500",
      originalPrice: "KES 5,500",
      features: [
        "Perfect for 3-5 devices",
        "HD streaming on multiple devices",
        "Video calls and gaming",
        "Free WiFi router",
        "Free installation",
        "24/7 premium support",
      ],
      popular: true,
      color: "purple",
    },
    {
      name: "Power User",
      icon: <FaCrown />,
      speed: "50 Mbps",
      price: "KES 7,500",
      originalPrice: "KES 9,000",
      features: [
        "Perfect for 6-10 devices",
        "4K streaming",
        "Heavy gaming and downloads",
        "Mesh router included",
        "Priority support",
        "Free CCTV integration",
      ],
      popular: false,
      color: "orange",
    },
    {
      name: "Business Pro",
      icon: <FaBuilding />,
      speed: "100 Mbps",
      price: "KES 12,000",
      originalPrice: "KES 15,000",
      features: [
        "Unlimited devices",
        "Dedicated bandwidth",
        "Static IP address",
        "Enterprise security",
        "SLA guarantee",
        "On-site support",
      ],
      popular: false,
      color: "green",
    },
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenModal = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      ...formData,
      packageName: pkg.name,
      packageSpeed: pkg.speed,
      packagePrice: pkg.price,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPackage(null);
    setFormErrors({});
    setIsSubmitting(false);
    // Reset form data except package info
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const message = `I'm interested in the ${formData.packageName} package (${formData.packageSpeed}) for ${formData.packagePrice}/month. Details: Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}`;
      handleWhatsApp(message);
      handleCloseModal();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <section ref={ref} id="packages" className={styles.packages}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <h2 className={styles.title}>Internet Packages</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Choose the perfect plan for your home or business. All packages
            include free installation and 24/7 support.
          </p>
        </div>

        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`${styles.packageCard} ${
                pkg.popular ? styles.popular : ""
              } ${isVisible ? styles.slideInUp : ""} ${styles[pkg.color]}`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredPackage(index)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {pkg.popular && (
                <div className={styles.popularBadge}>
                  <span>Most Popular</span>
                </div>
              )}

              <div className={styles.packageIcon}>{pkg.icon}</div>

              <div className={styles.packageHeader}>
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <div className={styles.speedBadge}>
                  <span className={styles.speed}>{pkg.speed}</span>
                </div>
              </div>

              <div className={styles.pricing}>
                <div className={styles.price}>{pkg.price}</div>
                <div className={styles.originalPrice}>{pkg.originalPrice}</div>
                <div className={styles.period}>per month</div>
              </div>

              <ul className={styles.features}>
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className={styles.feature}>
                    <FaCheck className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleOpenModal(pkg)}
                className={`${styles.ctaButton} ${
                  pkg.popular ? styles.primaryCta : styles.secondaryCta
                }`}
              >
                <span>Get Started</span>
                <div className={styles.buttonRipple}></div>
              </button>

              <div
                className={`${styles.hoverOverlay} ${
                  hoveredPackage === index ? styles.active : ""
                }`}
              ></div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div
            className={styles.modalBackdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className={styles.modal}
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <div className={styles.modalHeader}>
                <h2 id="modal-title" className={styles.modalTitle}>
                  Get {selectedPackage?.name}
                </h2>
                <p className={styles.modalSubtitle}>
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className={styles.modalForm}
                noValidate
              >
                <div className={styles.packageSummary}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Package:</span>
                    <span className={styles.summaryValue}>
                      {formData.packageName}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Speed:</span>
                    <span className={styles.summaryValue}>
                      {formData.packageSpeed}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Price:</span>
                    <span className={styles.summaryValue}>
                      {formData.packagePrice}/month
                    </span>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    <FaUser className={styles.labelIcon} />
                    Full Name *
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      formErrors.name ? styles.error : ""
                    }`}
                    placeholder="Enter your full name"
                    aria-describedby={
                      formErrors.name ? "name-error" : undefined
                    }
                  />
                  {formErrors.name && (
                    <span id="name-error" className={styles.errorMessage}>
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    <FaEnvelope className={styles.labelIcon} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      formErrors.email ? styles.error : ""
                    }`}
                    placeholder="Enter your email address"
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                  />
                  {formErrors.email && (
                    <span id="email-error" className={styles.errorMessage}>
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    <FaPhone className={styles.labelIcon} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${
                      formErrors.phone ? styles.error : ""
                    }`}
                    placeholder="Enter your phone number"
                    aria-describedby={
                      formErrors.phone ? "phone-error" : undefined
                    }
                  />
                  {formErrors.phone && (
                    <span id="phone-error" className={styles.errorMessage}>
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        <div
          className={`${styles.additionalInfo} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>🚀</div>
              <h4>Instant Setup</h4>
              <p>Get connected within 24 hours</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>🛡️</div>
              <h4>Secure Network</h4>
              <p>Advanced security protocols</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📞</div>
              <h4>24/7 Support</h4>
              <p>Always here to help you</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>💰</div>
              <h4>Best Value</h4>
              <p>Competitive pricing guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
