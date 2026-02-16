import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Check } from 'lucide-react';
import './WorkExperience.css';

const WorkExperience = ({ experiences = [] }) => {
  if (!experiences || experiences.length === 0) return null;

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section className="work-experience-section">
      <div className="section-header">
        <h2>Work Experience</h2>
        <p className="section-subtitle">Professional journey and accomplishments</p>
      </div>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="timeline-marker">
              <div className="timeline-dot"></div>
              {index < experiences.length - 1 && <div className="timeline-line"></div>}
            </div>

            <div className="experience-card">
              <div className="experience-header">
                <div className="experience-icon">
                  <Briefcase size={20} />
                </div>
                
                <div className="experience-info">
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-company">{exp.company}</div>
                  
                  <div className="experience-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span className="font-mono">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {exp.current && (
                  <div className="current-badge">
                    <span className="pulse-dot"></span>
                    Current
                  </div>
                )}
              </div>

              {exp.description && (
                <p className="experience-description">{exp.description}</p>
              )}

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="achievements">
                  <h4>Key Achievements</h4>
                  <ul className="achievements-list">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>
                        <Check size={16} />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
