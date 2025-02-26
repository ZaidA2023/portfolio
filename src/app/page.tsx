'use client'

import { useEffect, useState, useRef } from "react";

export default function Portfolio() {
  const [projectCount, setProjectCount] = useState(0);
  const totalProjects = 30;
  const projectsPerLoad = 5;
  const portfolioContainer = useRef<HTMLDivElement>(null);
  const indexList = useRef<HTMLUListElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProjects = () => {
      if (!portfolioContainer.current || !indexList.current) return;

      for (let i = 0; i < projectsPerLoad; i++) {
        if (projectCount >= totalProjects) return;
        setProjectCount((prev) => prev + 1);

        // Create project
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.id = `project-${projectCount + 1}`;
        projectDiv.innerHTML = `
          <h3>Project ${projectCount + 1}</h3>
          <p>Sample description for Project ${projectCount + 1}.</p>
        `;

        // Append to portfolio
        portfolioContainer.current.appendChild(projectDiv);

        // Create index entry
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#project-${projectCount + 1}`;
        link.textContent = `Project ${projectCount + 1}`;
        li.appendChild(link);
        indexList.current.appendChild(li);
      }
    };

    // Infinite Scroll Observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadProjects();
      }
    });

    if (sentinel.current) observer.observe(sentinel.current);

    return () => observer.disconnect();
  }, [projectCount]);

  useEffect(() => {
    const updateActiveIndex = () => {
      const projects = document.querySelectorAll(".project");
      let activeIndex = 0;

      projects.forEach((proj, i) => {
        const rect = proj.getBoundingClientRect();
        if (rect.bottom >= 50) activeIndex = i;
      });

      document.querySelectorAll("#indexList li a").forEach((link) => {
        link.classList.remove("active-index");
      });

      const activeLink = document.querySelector(`#indexList li:nth-child(${activeIndex + 1}) a`);
      if (activeLink) activeLink.classList.add("active-index");
    };

    window.addEventListener("scroll", updateActiveIndex);
    return () => window.removeEventListener("scroll", updateActiveIndex);
  }, []);

  return (
    <div>
      {/* Fixed Index Navigation */}
      <nav id="index">
        <h2>Projects</h2>
        <ul id="indexList" ref={indexList}></ul>
      </nav>

      {/* Portfolio Container */}
      <div id="portfolio" ref={portfolioContainer}></div>

      {/* Sentinel for Infinite Scroll */}
      <div id="sentinel" ref={sentinel}></div>

      {/* Styles */}
      <style jsx>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #2c3930;
        }
        #index {
          position: fixed;
          top: 0;
          left: 0;
          width: 200px;
          height: 100vh;
          overflow-y: auto;
          background: #2c3930;
          padding: 20px;
        }
        #index h2 {
          color: #dcd7c9;
        }
        #index ul {
          list-style: none;
          padding: 0;
        }
        #index li {
          margin-bottom: 10px;
        }
        #index a {
          text-decoration: none;
          font-weight: bold;
          color: #dcd7c9;
        }
        #index a:hover {
          text-decoration: underline;
        }
        .active-index {
          font-weight: 300;
          color: #a27b5c !important;
          padding: 5px;
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        #portfolio {
          margin-left: 220px;
          padding: 20px;
        }
        .project {
          margin-bottom: 40px;
          padding: 20px;
          background: #a27b5c;
          border-radius: 4px;
        }
        .project h3 {
          margin-top: 0;
        }
        #sentinel {
          height: 20px;
        }
      `}</style>
    </div>
  );
}
