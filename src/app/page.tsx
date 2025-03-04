'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Slideshow from "./Slideshow"
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function InfinitePortfolio() {
  const [showTitle, setShowTitle] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [showEmailCopied, setShowEmailCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText('your-email@example.com')
      .then(() => {
        setShowEmailCopied(true);
        setTimeout(() => setShowEmailCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy email:', err);
      });
  };

  // Sections configuration
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];
  const projects = [
    { 
      id: 1, 
      title: 'AI Chat Interface', 
      description: 'Developed a conversational AI using React and TensorFlow.js',
      tech: 'React · NLP · TensorFlow'
    },
    { 
      id: 2, 
      title: 'E-Commerce Platform', 
      description: 'Full-stack shopping platform with Node.js and Stripe integration',
      tech: 'Next.js · Node · MongoDB'
    },
    { 
      id: 3, 
      title: 'AR Navigation App', 
      description: 'Mobile AR navigation system using Unity and ARKit',
      tech: 'Unity · C# · ARKit'
    },
  ];
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const shouldShowTitle = window.scrollY < 50; // Adjust threshold as needed
      setShowTitle(shouldShowTitle);
      const scrollPosition = window.scrollY + window.innerHeight / 4;
      const sections = Array.from(document.querySelectorAll('section'));
      
      const active = sections.find(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return scrollPosition >= top && scrollPosition < bottom;
      });
      if(active) setActiveSection(active.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[300vh]">
      {/* Title Screen */}
      <AnimatePresence>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            id = "title"
          >
          <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-white" id="text">Zaid Albustami</div>
          <p className="text-2xl text-white mt-2"id="text2">Computer Science @ UT Austin</p>
          
          </div>
          <div className="absolute bottom-24 w-full text-center">
            <div className="arrow absolute bottom-0">
              <span></span>
              <span></span>
              <span></span>
          </div>
          </div>
          <button className="absolute left-8 absolute bottom-5">
            <a 
              href="https://www.linkedin.com/in/zaidalbustami/" 
              target="_blank"
              rel="noopener noreferrer"
            >
            <FaLinkedinIn className="w-8 h-8" />
            </a>
          </button>
          <button className="absolute left-[4.4rem] absolute bottom-[1.1rem]">
            <a 
              href="https://github.com/ZaidA2023" 
              target="_blank"
              rel="noopener noreferrer"
            >
            <DiGithubBadge className="w-9 h-9" />
            </a>
          </button>
          <button className="absolute left-28 absolute bottom-[1.1rem]"
                  onClick={handleEmailClick}>
              <MdEmail className="w-8 h-8" />
          </button>
          {showEmailCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-20 bottom-14 bg-white text-black px-3 py-1 rounded-md text-sm"
          >
            Email copied!
          </motion.div>
      )}
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
            className="fixed left-0 top-0 h-screen w-1/6 bg-[#000a00] backdrop-blur-lg z-40"
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
                        ? 'bg-[#DCD7C9]/10 text-white'
                        : 'text-[#DCD7C9] hover:bg-[#DCD7C9]/5'
                    }`}
                  >
                    {section.id === 'hero' && <UserCircleIcon className="w-6 h-6" />}
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

      <motion.main
        className="min-h-screen bg-gray-50 sticky top-0 z-30"
        style={{
          scale: !showTitle ? 5/6 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <section id="hero" className="h-screen flex flex-col justify-center items-center text-center px-4 w-full">
          <Slideshow></Slideshow>
        </section>

        {/* Projects Section */}
        <section id="projects" className="h-screen flex bg-white">
        <div className="max-w-6xl mx-auto px-4 w-full py-20">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: activeSection === 'projects' ? 1 : 0,
        y: activeSection === 'projects' ? 0 : 20
      }}
      className="text-4xl font-bold mb-12 text-gray-800"
    >
      Featured Work
    </motion.h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{
            opacity: activeSection === 'projects' ? 1 : 0,
            y: activeSection === 'projects' ? 0 : 30,
            scale: activeSection === 'projects' ? 1 : 0.95
          }}
          transition={{ 
            delay: index * 0.15,
            type: "spring", 
            stiffness: 100 
          }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{project.tech}</p>
          </div>
          <p className="text-gray-600">{project.description}</p>
          <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
            View Case Study →
          </button>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        <section id="contact" className="h-screen flex items-center justify-center bg-white text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Let's Connect!</h2>
          </div>
        </section>
      </motion.main>
    </div>
  );
}