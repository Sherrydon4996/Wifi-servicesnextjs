"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaHome,
  FaBriefcase,
  FaVideo,
  FaHeadset,
  FaMobileAlt,
  FaDesktop,
  FaTv,
  FaGamepad,
  FaCloud,
  FaDatabase,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";
import styles from "./Service.module.css";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const mainServices = [
    {
      icon: <FaHome />,
      title: "Home WiFi",
      description: "Fast, reliable internet for your family's needs",
      features: [
        "Unlimited bandwidth",
        "Multiple device support",
        "Family-friendly controls",
        "24/7 monitoring",
      ],
      color: "blue",
    },
    {
      icon: <FaBriefcase />,
      title: "Business Internet",
      description: "Enterprise solutions with dedicated support",
      features: [
        "Dedicated bandwidth",
        "Static IP addresses",
        "Priority support",
        "SLA guarantees",
      ],
      color: "green",
    },
    {
      icon: <FaVideo />,
      title: "CCTV & IoT",
      description: "Smart home and security system integration",
      features: [
        "HD camera systems",
        "Remote monitoring",
        "Smart home integration",
        "Professional installation",
      ],
      color: "purple",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance",
      features: [
        "Live chat support",
        "Phone assistance",
        "On-site visits",
        "Remote troubleshooting",
      ],
      color: "orange",
    },
  ];

  const additionalServices = [
    {
      icon: <FaMobileAlt />,
      label: "Mobile Optimization",
      description: "Optimized for mobile devices",
    },
    {
      icon: <FaDesktop />,
      label: "Desktop Setup",
      description: "Professional desktop configuration",
    },
    {
      icon: <FaTv />,
      label: "Smart TV",
      description: "Streaming and smart TV setup",
    },
    {
      icon: <FaGamepad />,
      label: "Gaming",
      description: "Low latency gaming networks",
    },
    {
      icon: <FaCloud />,
      label: "Cloud Services",
      description: "Cloud storage and backup",
    },
    {
      icon: <FaDatabase />,
      label: "Data Management",
      description: "Secure data handling",
    },
    {
      icon: <FaShieldAlt />,
      label: "Security",
      description: "Advanced network security",
    },
    {
      icon: <FaRocket />,
      label: "Speed Boost",
      description: "Maximum performance optimization",
    },
  ];

  return (
    <section ref={ref} id="services" className={styles.services}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <h2 className={styles.title}>Our Services</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Comprehensive internet solutions designed for modern Kenyan homes
            and businesses
          </p>
        </div>

        {/* Main Services Grid */}
        <div className={styles.mainServicesGrid}>
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`${styles.serviceCard} ${styles[service.color]} ${
                isVisible ? styles.slideInUp : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>

              <div className={styles.serviceFeatures}>
                {service.features.map((feature, fIndex) => (
                  <div key={fIndex} className={styles.feature}>
                    <div className={styles.featureDot}></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className={styles.serviceHover}>
                <button className={styles.learnMoreBtn}>Learn More</button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div
          className={`${styles.additionalServices} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <h3 className={styles.additionalTitle}>
            Additional Services & Features
          </h3>
          <div className={styles.additionalGrid}>
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`${styles.additionalItem} ${
                  isVisible ? styles.slideInUp : ""
                }`}
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
              >
                <div className={styles.additionalIcon}>{service.icon}</div>
                <div className={styles.additionalContent}>
                  <h4 className={styles.additionalLabel}>{service.label}</h4>
                  <p className={styles.additionalDescription}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Process */}
        <div
          className={`${styles.serviceProcess} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <h3 className={styles.processTitle}>How We Work</h3>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <h4>Consultation</h4>
              <p>We assess your needs and recommend the best solution</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <h4>Installation</h4>
              <p>Professional installation by certified technicians</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <h4>Testing</h4>
              <p>Comprehensive testing to ensure optimal performance</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <h4>Support</h4>
              <p>Ongoing support and maintenance for peace of mind</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
