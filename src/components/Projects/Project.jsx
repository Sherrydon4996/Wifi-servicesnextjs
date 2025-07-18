// components/Projects/Projects.jsx
import React from "react";
import styles from "./Projects.module.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "3D Interactive Portfolio Website",
      description:
        "A visually engaging personal portfolio featuring real-time 3D animations and interactive UI components. Built to showcase work dynamically with immersive navigation and a modern, responsive layout.",
      technologies: ["React", "HTML", "CSS", "Three.js"],
      video: "/2025-07-02 18-17-00.mkv",
      liveDemo: "#",
      github: "#",
      category: "Portfolio",
    },
    {
      id: 2,
      title: "Beauty & Wellness Brand Website",
      description:
        "A clean, modern website designed for a beauty and wellness brand. Features smooth scrolling, responsive layouts, and aesthetic UI/UX to highlight products and services effectively.",
      technologies: ["React", "JavaScript", "HTML", "CSS"],
      video: "/2025-07-02 18-14-30.mkv",
      liveDemo: "#",
      github: "#",
      category: "Business Website",
    },
    {
      id: 3,
      title: "Restaurant Showcase Website",
      description:
        "An interactive website for a restaurant business, featuring engaging 3D visuals, animated transitions, real-time menu management, and responsive design for mobile and desktop users.",
      technologies: [
        "React",
        "JavaScript",
        "Three.js",
        "Node.js",
        "HTML",
        "CSS",
        "Supabase",
      ],
      video: "/2025-07-02 18-22-53.mkv",
      liveDemo: "#",
      github: "#",
      category: "Restaurant",
    },
    {
      id: 4,
      title: "Full-Featured E-Commerce Website",
      description:
        "A scalable e-commerce platform with user authentication, product listings, real-time inventory tracking, Stripe-powered payments, and sleek product browsing. Optimized for performance and user experience.",
      technologies: ["React", "Node.js", "Three.js", "HTML", "CSS", "Supabase"],
      video: "/2025-07-02 18-17-00.mkv",

      liveDemo: "#",
      github: "#",
      category: "E-Commerce",
    },
    {
      id: 5,
      title: "WordPress Restaurant Website",
      description:
        "A custom-built restaurant website using WordPress with Elementor. Features intuitive navigation, menu highlights, and mobile responsiveness — ideal for showcasing dining experiences and making online reservations.",
      technologies: ["WordPress", "HTML", "CSS"],

      video: "/2025-07-02 18-22-53.mkv",
      liveDemo: "#",
      github: "#",
      category: "Restaurant",
    },
    // {
    //   id: 6,
    //   title: "Social Media Dashboard",
    //   description:
    //     "Comprehensive social media management platform with analytics, post scheduling, and real-time engagement tracking. Features modern UI and seamless data flow.",
    //   technologies: ["React", "Node.js", "Supabase", "JavaScript", "Chart.js"],
    //   video:
    //     "https://player.vimeo.com/external/347849353.hd.mp4?s=f4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7&profile_id=174",
    //   liveDemo: "#",
    //   github: "#",
    //   category: "Social Media",
    // },
  ];

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Projects</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            A showcase of my recent work, demonstrating expertise across
            different technologies and modern web development practices
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.videoContainer}>
                <video
                  src={project.video}
                  className={styles.projectVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className={styles.overlay}>
                  <a href={project.liveDemo} className={styles.demoBtn}>
                    Live Demo
                  </a>
                  <a href={project.github} className={styles.githubBtn}>
                    GitHub
                  </a>
                </div>
              </div>
              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.categoryTag}>{project.category}</span>
                </div>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
