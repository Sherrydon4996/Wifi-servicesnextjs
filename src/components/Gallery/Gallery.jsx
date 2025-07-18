"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaPlay,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const galleryImages = [
    {
      src: "/gallery.jpg",
      alt: "Modern WiFi Setup",
      category: "installations",
      title: "Modern Home WiFi Setup",
    },
    {
      src: "/gallery2.jpeg",
      alt: "Network Infrastructure",
      category: "infrastructure",
      title: "Network Infrastructure",
    },
    {
      src: "/gallery3.jpeg",
      alt: "Professional Installation",
      category: "installations",
      title: "Professional Installation Team",
    },
    {
      src: "/gallery4.jpeg",
      alt: "Technical Team",
      category: "team",
      title: "Our Technical Experts",
    },
    {
      src: "/gallery5.jpeg",
      alt: "Fiber Optic Technology",
      category: "infrastructure",
      title: "Fiber Optic Technology",
    },
    {
      src: "/gallery5.jpg",
      alt: "Happy Customers",
      category: "customers",
      title: "Happy Customer Family",
    },
    {
      src: "/gallery6.jpg",
      alt: "Smart Home Setup",
      category: "installations",
      title: "Smart Home Integration",
    },
    {
      src: "/gallery7.jpeg",
      alt: "Business Network",
      category: "infrastructure",
      title: "Business Network Solutions",
    },
    {
      src: "/gallery9.jpeg",
      alt: "Team Meeting",
      category: "team",
      title: "Team Planning Session",
    },
  ];

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "installations", label: "Installations" },
    { key: "infrastructure", label: "Infrastructure" },
    { key: "team", label: "Our Team" },
    { key: "customers", label: "Customers" },
  ];

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === filter);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleKeyPress = (e) => {
    if (selectedImage) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentIndex]);

  return (
    <section ref={ref} id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <h2 className={styles.title}>Gallery</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            See our installations, team, and happy customers in action
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`${styles.filterContainer} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key)}
              className={`${styles.filterButton} ${
                filter === option.key ? styles.active : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={styles.galleryGrid}>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.galleryItem} ${
                isVisible ? styles.slideInUp : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(image, index)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.galleryImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <FaExpand className={styles.expandIcon} />
                    <h3 className={styles.imageTitle}>{image.title}</h3>
                    <p className={styles.imageCategory}>{image.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className={`${styles.galleryStats} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <div className={styles.stat}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Installations</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Projects</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>25+</div>
            <div className={styles.statLabel}>Locations</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <button
              className={`${styles.modalNav} ${styles.modalPrev}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>

            <button
              className={`${styles.modalNav} ${styles.modalNext}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>

            <div className={styles.modalImageContainer}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalInfo}>
              <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
              <p className={styles.modalCategory}>{selectedImage.category}</p>
              <div className={styles.modalCounter}>
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
