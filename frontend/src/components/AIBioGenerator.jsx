import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIBioGenerator.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AIBioGenerator = ({ profile, onBioUpdate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBio, setGeneratedBio] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [tone, setTone] = useState('professional');

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'creative',     label: 'Creative'     },
    { value: 'casual',       label: 'Casual'       },
    { value: 'technical',    label: 'Technical'    },
  ];

  const generateBio = async () => {
    setIsGenerating(true);
    setError('');
    setGeneratedBio('');

    try {
      // ✅ Calls YOUR backend — no CORS issues!
      const response = await fetch(`${API_URL}/profiles/generate-bio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, tone }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      if (data?.bio) {
        setGeneratedBio(data.bio);
      } else {
        throw new Error('No bio returned');
      }
    } catch (err) {
      console.error('Bio generation error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseThisBio = () => {
    onBioUpdate(generatedBio);
  };

  return (
    <section className="ai-bio-section">
      <div className="ai-bio-header">
        <div className="ai-bio-title">
          <Wand2 size={22} className="ai-icon" />
          <div>
            <h2>AI Bio Generator</h2>
            <p className="ai-bio-subtitle">Generate a personalised bio from your profile data</p>
          </div>
        </div>
      </div>

      {/* Tone Selector */}
      <div className="tone-selector">
        <span className="tone-label">Tone:</span>
        <div className="tone-buttons">
          {tones.map(t => (
            <button
              key={t.value}
              className={`tone-btn ${tone === t.value ? 'active' : ''}`}
              onClick={() => setTone(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Tags */}
      <div className="profile-tags">
        <span className="tags-label">Using your:</span>
        <div className="tags-list">
          {profile.skills?.slice(0, 4).map((skill, i) => (
            <span key={i} className="profile-tag skill-tag">{skill.name}</span>
          ))}
          {profile.interests?.slice(0, 2).map((interest, i) => (
            <span key={i} className="profile-tag interest-tag">{interest}</span>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        className={`generate-btn ${isGenerating ? 'loading' : ''}`}
        onClick={generateBio}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <RefreshCw size={18} className="spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>Generate AI Bio</span>
          </>
        )}
      </button>

      {/* Generated Bio Output */}
      <AnimatePresence>
        {generatedBio && (
          <motion.div
            className="generated-bio-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <div className="bio-card-header">
              <span className="bio-card-label">
                <Sparkles size={14} /> AI Generated Bio
              </span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <p className="generated-bio-text">{generatedBio}</p>

            <div className="bio-card-actions">
              <button className="btn-regenerate" onClick={generateBio} disabled={isGenerating}>
                <RefreshCw size={16} />
                Regenerate
              </button>
              <button className="btn-use-bio" onClick={handleUseThisBio}>
                <Check size={16} />
                Use This Bio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="ai-error">
          <p>{error}</p>
        </div>
      )}
    </section>
  );
};

export default AIBioGenerator;
