import React from 'react';
import { Mail, MapPin, Phone, Globe, Edit2, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProfileHeader.css';

const ProfileHeader = ({ profile, isEditing, onEditToggle, onThemeToggle }) => {
  return (
    <motion.header 
      className="profile-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-background">
        <div className="background-pattern"></div>
      </div>
      
      <div className="header-content container">
        <div className="header-top">
          <div className="header-actions">
            <button 
              className="icon-button theme-toggle"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {profile.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className={`btn btn-edit ${isEditing ? 'active' : ''}`}
              onClick={onEditToggle}
            >
              <Edit2 size={18} />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        <div className="header-main">
          <motion.div 
            className="profile-image-wrapper"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={profile.profile_picture} 
              alt={profile.name}
              className="profile-image"
            />
            <div className="image-border"></div>
          </motion.div>

          <div className="profile-info">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-title">{profile.title}</p>
              
              <div className="availability-badge">
                <span className={`status-indicator ${profile.availability.toLowerCase().replace(/\s+/g, '-')}`}></span>
                <span className="font-mono">{profile.availability}</span>
              </div>
            </motion.div>

            <motion.div 
              className="contact-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {profile.location && (
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <div className="contact-item">
                  <Mail size={16} />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              )}
              {profile.phone && (
                <div className="contact-item">
                  <Phone size={16} />
                  <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                </div>
              )}
              {profile.website && (
                <div className="contact-item">
                  <Globe size={16} />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer">
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default ProfileHeader;
