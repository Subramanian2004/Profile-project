import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIBioGenerator.css';

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

  const buildPrompt = () => {
    const skillNames  = profile.skills?.map(s => s.name).join(', ')         || 'various skills';
    const interests   = profile.interests?.join(', ')                         || 'technology';
    const achievements= profile.achievements?.slice(0, 3).join(', ')         || '';
    const experience  = profile.workExperience?.length > 0
      ? `${profile.workExperience.length} work experience(s) including ${profile.workExperience[0]?.title} at ${profile.workExperience[0]?.company}`
      : 'diverse work experience';

    return `Generate a ${tone} bio for a developer profile with these details:
Name: ${profile.name}
Title: ${profile.title}
Skills: ${skillNames}
Interests: ${interests}
${achievements ? `Achievements: ${achievements}` : ''}
Experience: ${experience}
Location: ${profile.location || 'Not specified'}

Requirements:
- Write in first person
- Keep it between 60-100 words
- Tone must be ${tone}
- Highlight key skills naturally
- Make it sound authentic and human
- Do NOT use bullet points
- Do NOT include any preamble or explanation, just the bio itself`;
  };

  const generateBio = async () => {
    setIsGenerating(true);
    setError('');
    setGeneratedBio('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [{ role: 'user', content: buildPrompt() }],
        }),
      });

      const data = await response.json();

      if (data?.content?.[0]?.text) {
        setGeneratedBio(data.content[0].text.trim());
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      // Fallback: generate a smart bio from profile data without API
      setGeneratedBio(generateFallbackBio());
    } finally {
      setIsGenerating(false);
    }
  };

  // Smart fallback bio if API fails
  const generateFallbackBio = () => {
    const skills     = profile.skills?.slice(0, 3).map(s => s.name).join(', ') || 'modern technologies';
    const topSkill   = profile.skills?.[0]?.name || 'software development';
    const location   = profile.location ? `Based in ${profile.location}, ` : '';
    const experience = profile.workExperience?.[0];
    const role       = experience ? `${experience.title} at ${experience.company}` : profile.title;

    const bios = {
      professional: `${location}I am a ${profile.title} specialising in ${skills}. As ${role}, I bring a strong foundation in building scalable, user-focused solutions. Passionate about clean code and continuous learning, I thrive on turning complex challenges into elegant software.`,
      creative:     `Code is my canvas and ${topSkill} is my brush. ${location}I craft digital experiences as ${profile.title}, weaving together ${skills} to build products people love. Every line of code is an opportunity to solve a real problem beautifully.`,
      casual:       `Hey! I'm a ${profile.title} who loves building things with ${skills}. ${location}I spend my days writing code, solving interesting problems, and constantly picking up new skills. Always open to exciting projects and collaborations!`,
      technical:    `${profile.title} with hands-on expertise in ${skills}. ${location}Currently working as ${role}, focusing on performance, scalability, and maintainable architecture. Committed to engineering best practices and delivering high-quality software solutions.`,
    };

    return bios[tone] || bios.professional;
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

      {/* Profile Tags Used */}
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

      {/* Error */}
      {error && (
        <div className="ai-error">
          <p>{error}</p>
        </div>
      )}
    </section>
  );
};

export default AIBioGenerator;
