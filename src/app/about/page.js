"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaAward,
  FaUsers,
  FaGlobe,
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import styles from "./About.module.css";
import Image from "next/image";

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    customers: 0,
    locations: 0,
    uptime: 0,
    years: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);

      // Animate counters
      const targets = {
        customers: 50000,
        locations: 25,
        uptime: 99.9,
        years: 6,
      };

      const duration = 2000;
      const interval = 50;
      const steps = duration / interval;

      Object.keys(targets).forEach((key) => {
        const increment = targets[key] / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targets[key]) {
            current = targets[key];
            clearInterval(timer);
          }
          setCounters((prev) => ({
            ...prev,
            [key]: key === "uptime" ? current.toFixed(1) : Math.floor(current),
          }));
        }, interval);
      });
    }
  }, [inView]);

  const values = [
    {
      icon: <FaAward />,
      title: "Excellence",
      description:
        "Delivering world-class service standards with cutting-edge technology and professional expertise.",
      color: "blue",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description:
        "Building stronger connected communities across Kenya through reliable internet infrastructure.",
      color: "green",
    },
    {
      icon: <FaGlobe />,
      title: "Innovation",
      description:
        "Leading with cutting-edge technology and innovative solutions for the digital future.",
      color: "purple",
    },
  ];

  const achievements = [
    {
      icon: <FaCheckCircle />,
      title: "ISO Certified",
      description: "Quality management system certification",
    },
    {
      icon: <FaChartLine />,
      title: "Market Leader",
      description: "Top 3 fiber internet provider in Kenya",
    },
    {
      icon: <FaShieldAlt />,
      title: "Security First",
      description: "Advanced cybersecurity protocols",
    },
  ];

  return (
    <section ref={ref} id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <h2 className={styles.title}>About KenyaFiber</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.contentGrid}>
          <div
            className={`${styles.textContent} ${
              isVisible ? styles.slideInLeft : ""
            }`}
          >
            <h3 className={styles.sectionTitle}>
              Connecting Kenya to the Future
            </h3>
            <p className={styles.description}>
              Since 2018, KenyaFiber has been at the forefront of Kenya's
              digital transformation, providing reliable, high-speed internet
              solutions to homes and businesses across the country.
            </p>
            <p className={styles.description}>
              Our mission is to bridge the digital divide by making fast,
              affordable internet accessible to every Kenyan, empowering
              communities and driving economic growth through innovative
              technology solutions.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>
                  {counters.customers.toLocaleString()}+
                </div>
                <div className={styles.statLabel}>Happy Customers</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{counters.locations}+</div>
                <div className={styles.statLabel}>Locations Covered</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{counters.uptime}%</div>
                <div className={styles.statLabel}>Network Uptime</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{counters.years}+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.imageContent} ${
              isVisible ? styles.slideInRight : ""
            }`}
          >
            <div className={styles.imageContainer}>
              <img
                src="/about.jpg"
                alt="KenyaFiber Team"
                className={styles.aboutImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <h4>Our Vision</h4>
                  <p>
                    A fully connected Kenya where everyone has access to
                    reliable, high-speed internet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div
          className={`${styles.valuesSection} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <h3 className={styles.valuesTitle}>Our Core Values</h3>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div
                key={index}
                className={`${styles.valueCard} ${styles[value.color]} ${
                  isVisible ? styles.slideInUp : ""
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div
          className={`${styles.achievementsSection} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <h3 className={styles.achievementsTitle}>Our Achievements</h3>
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`${styles.achievementCard} ${
                  isVisible ? styles.slideInUp : ""
                }`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className={styles.achievementIcon}>{achievement.icon}</div>
                <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                <p className={styles.achievementDescription}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div
          className={`${styles.missionStatement} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <div className={styles.missionContent}>
            <h3 className={styles.missionTitle}>Our Mission</h3>
            <p className={styles.missionText}>
              To empower every Kenyan with reliable, high-speed internet
              connectivity that enables education, business growth, and digital
              inclusion, while maintaining the highest standards of service
              excellence and customer satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
