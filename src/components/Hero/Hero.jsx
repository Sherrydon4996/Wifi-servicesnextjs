"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";
import styles from "./Hero.module.css";

// Enhanced WiFi Symbol with Neumorphic Elements
const WiFiSymbol = () => {
  const groupRef = useRef();
  const meshRef1 = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      meshRef1.current.rotation.x += 0.002;
      meshRef2.current.rotation.y += 0.004;
      meshRef3.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neumorphic WiFi Rings */}
      <mesh ref={meshRef1} position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.12, 16, 100]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.5}
          emissive="#1e3a8a"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={meshRef2} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.4}
          emissive="#5b21b6"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh ref={meshRef3} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.6}
          roughness={0.4}
          metalness={0.3}
          emissive="#0e7490"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Central glowing sphere */}
      <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#f0f9ff"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.6}
        />
      </Sphere>
    </group>
  );
};

// Floating Particles with Micro-Interactions
const FloatingParticles = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={particlesRef}>
      <Stars
        radius={120}
        depth={60}
        count={5000}
        factor={5}
        saturation={1}
        fade
        speed={0.3}
      />
    </group>
  );
};

const Hero = ({ handleWhatsApp }) => {
  const [currentHero, setCurrentHero] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Updated Hero slides with 4K images
  const heroSlides = [
    {
      title: "Blazing Fast Fiber Internet",
      subtitle: "Experience seamless 4K streaming with speeds up to 1Gbps",
      cta: "Get Connected Now",
      image: "/erasedbgImage.png",
    },
    {
      title: "Enterprise-Grade Connectivity",
      subtitle: "Reliable, high-speed internet for your business needs",
      cta: "Explore Business Plans",
      image: "/wifi4.jpg",
    },
    {
      title: "Smart Home, Smarter Network",
      subtitle: "Connect every device with our cutting-edge WiFi technology",
      cta: "Discover More",
      image: "/wifi1.jpg",
    },
  ];

  // Auto-slide hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section ref={ref} id="home" className={styles.hero}>
      {/* Three.js Background */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[15, 15, 15]} intensity={1} />
          <pointLight
            position={[-15, -15, -15]}
            intensity={0.6}
            color="#a78bfa"
          />
          <FloatingParticles />
          <WiFiSymbol />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div
              className={`${styles.textContent} ${
                isVisible ? styles.fadeIn : ""
              }`}
            >
              <h1 className={styles.title}>{heroSlides[currentHero].title}</h1>
              <p className={styles.subtitle}>
                {heroSlides[currentHero].subtitle}
              </p>
              <div className={styles.ctaButtons}>
                <button
                  className={styles.primaryButton}
                  onClick={() => handleWhatsApp(heroSlides[currentHero].cta)}
                >
                  {heroSlides[currentHero].cta}
                </button>
                <button
                  onClick={() =>
                    handleWhatsApp(
                      "I want to learn more about your internet packages"
                    )
                  }
                  className={styles.secondaryButton}
                >
                  Chat on WhatsApp
                </button>
              </div>
              {/* Bento Grid Features */}
              <div className={styles.features}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>⚡</div>
                  <span>1Gbps Speeds</span>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🛡️</div>
                  <span>Advanced Security</span>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🔧</div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.imageContent} ${
                isVisible ? styles.fadeIn : ""
              }`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={heroSlides[currentHero].image}
                  alt="WiFi Services"
                  className={styles.heroImage}
                />
                <div className={styles.glassOverlay}></div>
                {/* Floating Stats with Neumorphism */}
                <div className={styles.floatingStats}>
                  <div className={styles.stat}>
                    <div className={styles.statNumber}>100K+</div>
                    <div className={styles.statLabel}>Satisfied Users</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statNumber}>99.99%</div>
                    <div className={styles.statLabel}>Network Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Indicators with Micro-Interactions */}
      <div className={styles.indicators}>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHero(index)}
            className={`${styles.indicator} ${
              currentHero === index ? styles.active : ""
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator with Subtle Animation */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span>Explore More</span>
      </div>
    </section>
  );
};

export default Hero;
