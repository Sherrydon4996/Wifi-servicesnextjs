"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const testimonials = [
    {
      name: "Sarah Wanjiku",
      location: "Westlands, Nairobi",
      rating: 5,
      text: "Switched to KenyaFiber 6 months ago and haven't looked back. The speed is consistent and customer service is exceptional! My family can now stream, work, and game without any interruptions.",
      image: "/Timage1.jpeg",
      occupation: "Marketing Manager",
    },
    {
      name: "David Kipchoge",
      location: "Karen, Nairobi",
      rating: 5,
      text: "Perfect for my family's needs. Kids can stream while I work from home without any interruptions. The installation was professional and the support team is always helpful.",
      image: "/Timage2.jpeg",
      occupation: "Software Developer",
    },
    {
      name: "Grace Muthoni",
      location: "Kilimani, Nairobi",
      rating: 5,
      text: "Installation was quick and professional. The technicians explained everything clearly and the internet speed is exactly as advertised. Best decision I made for my home office.",
      image: "/Timage3.jpeg",
      occupation: "Business Owner",
    },
    {
      name: "Michael Ochieng",
      location: "Lavington, Nairobi",
      rating: 5,
      text: "Outstanding service! The fiber connection has transformed how my family uses the internet. Streaming 4K content is now seamless and video calls are crystal clear.",
      image: "/Timage4.jpeg",
      occupation: "Consultant",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={ref} id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        ∙
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <h2 className={styles.title}>What Our Customers Say</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Real feedback from satisfied customers across Kenya
          </p>
        </div>
        <div className={styles.testimonialContainer}>
          <div
            className={`${styles.testimonialCard} ${
              isVisible ? styles.slideInUp : ""
            }`}
          >
            <div className={styles.testimonialContent}>
              <div className={styles.quoteIcon}>
                <FaQuoteLeft />
              </div>

              <div className={styles.testimonialText}>
                <p>"{testimonials[currentTestimonial].text}"</p>
              </div>

              <div className={styles.rating}>
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <FaStar key={i} className={styles.star} />
                  )
                )}
              </div>

              <div className={styles.customerInfo}>
                <div className={styles.customerImage}>
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                  />
                </div>
                <div className={styles.customerDetails}>
                  <h4 className={styles.customerName}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className={styles.customerOccupation}>
                    {testimonials[currentTestimonial].occupation}
                  </p>
                  <p className={styles.customerLocation}>
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className={styles.indicators}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`${styles.indicator} ${
                  currentTestimonial === index ? styles.active : ""
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div
          className={`${styles.testimonialPreview} ${
            isVisible ? styles.fadeInUp : ""
          }`}
        >
          <div className={styles.previewGrid}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${styles.previewCard} ${
                  index === currentTestimonial ? styles.active : ""
                }`}
                onClick={() => goToTestimonial(index)}
              >
                <div className={styles.previewImage}>
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className={styles.previewContent}>
                  <h5 className={styles.previewName}>{testimonial.name}</h5>
                  <p className={styles.previewLocation}>
                    {testimonial.location}
                  </p>
                  <div className={styles.previewRating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
