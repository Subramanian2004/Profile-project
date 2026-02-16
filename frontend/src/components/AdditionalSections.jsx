import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, Award, Heart } from 'lucide-react';
import './AdditionalSections.css';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  globe: Globe,
  portfolio: Globe,
};

export const SocialLinks = ({ links = [] }) => {
  if (!links || links.length === 0) return null;

  return (
    <section className="social-links-section">
      <h2>Connect</h2>
      <div className="social-links-grid">
        {links.map((link, index) => {
          const Icon = iconMap[link.icon?.toLowerCase()] || Globe;
          return (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="social-icon">
                <Icon size={24} />
              </div>
              <div className="social-info">
                <div className="social-platform">{link.platform}</div>
                <div className="social-url">{link.url.replace(/^https?:\/\//, '')}</div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export const Achievements = ({ achievements = [] }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section className="achievements-section">
      <h2>Achievements</h2>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Award size={20} className="achievement-icon" />
            <span>{achievement}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Interests = ({ interests = [] }) => {
  if (!interests || interests.length === 0) return null;

  return (
    <section className="interests-section">
      <h2>Interests</h2>
      <div className="interests-grid">
        {interests.map((interest, index) => (
          <motion.div
            key={index}
            className="interest-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Heart size={14} />
            <span>{interest}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
