'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Slideshow from "./Slideshow"
//import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function InfinitePortfolio() {
  const [showTitle, setShowTitle] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  // Sections configuration
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Me' },
    { id: 'contact', label: 'Contact' }
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const shouldShowTitle = window.scrollY < 50; // Adjust threshold as needed
      setShowTitle(shouldShowTitle);
      
      // Update active section
      document.querySelectorAll('section').forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (bottom - (section.offsetHeight * 0.4) <= scrollY) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[500vh]">
      {/* Title Screen */}
      <AnimatePresence>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
          <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-white">Zaid Albustami</div>
          <p className="text-2xl text-white mt-2">Computer Science @ UT Austin</p>
          
          </div>
          <div className="absolute bottom-24 w-full text-center">
            <p className="text-3xl text-white">Scroll</p>
            <div className="arrow absolute bottom-0">
              <span></span>
              <span></span>
              <span></span>
          </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-height Sidebar */}
      <AnimatePresence>
        {!showTitle && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="fixed left-0 top-0 h-screen w-1/6 bg-black/90 backdrop-blur-lg z-40"
          >
            <div className="p-6 h-full flex flex-col">

              {/* Navigation Items */}
              <div className="space-y-6">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {section.id === 'hero' && <UserCircleIcon className="w-6 h-6" />}
                    {section.id === 'about' && <UserCircleIcon className="w-6 h-6" />}
                    {section.id === 'projects' && <CodeBracketIcon className="w-6 h-6" />}
                    {section.id === 'contact' && <CommandLineIcon className="w-6 h-6" />}
                    <motion.span
                      className="text-sm font-medium"
                    >
                      {section.label}
                    </motion.span>
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        className="min-h-screen bg-gray-50 sticky top-0 z-30"
        style={{
          scale: !showTitle ? 5/6 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Hero Section */}
        <section id="hero" className="h-screen flex flex-col justify-center items-center text-center px-4 w-full">
          <Slideshow></Slideshow>
        </section>

        {/* Projects Section */}
        <section id="projects" className="h-screen flex items-center justify-center bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            {/* Add your projects here */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="h-screen flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            {/* Add your about content here */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-screen flex items-center justify-center bg-white text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Let's Connect!</h2>
            <p className="text-xl">Keep scrolling to loop back</p>
          </div>
        </section>
      </motion.main>
    </div>
  );
}