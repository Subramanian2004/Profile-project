import React from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

const AboutSection = ({ bio }) => {
  if (!bio) return null;

  return (
    <motion.section 
      className="about-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="section-ornament">
        <div className="ornament-line"></div>
        <div className="ornament-dot"></div>
        <div className="ornament-line"></div>
      </div>
      
      <h2>About</h2>
      <p className="bio-text">{bio}</p>
    </motion.section>
  );
};

export default AboutSection;
