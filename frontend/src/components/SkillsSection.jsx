import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ThumbsUp, X, MessageSquare } from 'lucide-react';
import './SkillsSection.css';

const SkillsSection = ({ skills = [], profileId, onAddEndorsement }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [endorsementForm, setEndorsementForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showEndorsements, setShowEndorsements] = useState(null);

  const handleEndorseClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleEndorsementSubmit = async (e) => {
    e.preventDefault();
    
    const endorsementData = {
      endorsedBy: {
        name: endorsementForm.name,
        email: endorsementForm.email,
        avatar: `https://i.pravatar.cc/150?u=${endorsementForm.email}`
      },
      message: endorsementForm.message
    };

    await onAddEndorsement(selectedSkill._id, endorsementData);
    
    setSelectedSkill(null);
    setEndorsementForm({ name: '', email: '', message: '' });
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'var(--color-fog)',
      'Intermediate': 'var(--color-accent-secondary)',
      'Advanced': 'var(--color-accent-primary)',
      'Expert': 'var(--color-success)'
    };
    return colors[level] || colors['Intermediate'];
  };

  return (
    <section className="skills-section">
      <div className="section-header">
        <h2>Skills & Expertise</h2>
        <p className="section-subtitle">Technical capabilities and professional endorsements</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id || index}
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="skill-header">
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                <div 
                  className="skill-level"
                  style={{ '--level-color': getLevelColor(skill.level) }}
                >
                  {skill.level}
                </div>
              </div>
              
              {skill.yearsOfExperience && (
                <div className="skill-experience font-mono">
                  {skill.yearsOfExperience}+ years
                </div>
              )}
            </div>

            <div className="skill-endorsements">
              <div className="endorsement-count">
                <ThumbsUp size={16} />
                <span>{skill.endorsements?.length || 0} endorsements</span>
              </div>

              <div className="skill-actions">
                {skill.endorsements?.length > 0 && (
                  <button
                    className="btn-link"
                    onClick={() => setShowEndorsements(
                      showEndorsements === skill._id ? null : skill._id
                    )}
                  >
                    View All
                  </button>
                )}
                <button
                  className="btn-endorse"
                  onClick={() => handleEndorseClick(skill)}
                >
                  <Award size={16} />
                  <span>Endorse</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showEndorsements === skill._id && skill.endorsements?.length > 0 && (
                <motion.div
                  className="endorsements-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.endorsements.map((endorsement, idx) => (
                    <div key={idx} className="endorsement-item">
                      <img 
                        src={endorsement.endorsedBy.avatar} 
                        alt={endorsement.endorsedBy.name}
                        className="endorsement-avatar"
                      />
                      <div className="endorsement-content">
                        <div className="endorsement-header">
                          <strong>{endorsement.endorsedBy.name}</strong>
                          <span className="endorsement-date font-mono">
                            {new Date(endorsement.endorsedAt).toLocaleDateString()}
                          </span>
                        </div>
                        {endorsement.message && (
                          <p className="endorsement-message">{endorsement.message}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Endorsement Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3>Endorse {selectedSkill.name}</h3>
                  <p>Share your experience working with this skill</p>
                </div>
                <button 
                  className="icon-button"
                  onClick={() => setSelectedSkill(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleEndorsementSubmit} className="endorsement-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    value={endorsementForm.name}
                    onChange={(e) => setEndorsementForm({...endorsementForm, name: e.target.value})}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    value={endorsementForm.email}
                    onChange={(e) => setEndorsementForm({...endorsementForm, email: e.target.value})}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    value={endorsementForm.message}
                    onChange={(e) => setEndorsementForm({...endorsementForm, message: e.target.value})}
                    rows="4"
                    placeholder="Share your experience or recommendation..."
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedSkill(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Endorsement
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkillsSection;
