import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { profileAPI } from './services/api';
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import WorkExperience from './components/WorkExperience';
import { SocialLinks, Achievements, Interests } from './components/AdditionalSections';
import EditProfile from './components/EditProfile';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (profile?.theme) {
      document.documentElement.setAttribute('data-theme', profile.theme);
    }
  }, [profile?.theme]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get all profiles and use the first one
      const response = await profileAPI.getAllProfiles();
      
      if (response.data && response.data.length > 0) {
        setProfile(response.data[0]);
      } else {
        setError('No profile found. Please create one first.');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please check if the backend server is running.');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      const response = await profileAPI.updateProfile(profile._id, updatedData);
      setProfile(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
    }
  };

  const handleThemeToggle = async () => {
    const newTheme = profile.theme === 'light' ? 'dark' : 'light';
    
    try {
      await profileAPI.updateTheme(profile._id, newTheme);
      setProfile(prev => ({ ...prev, theme: newTheme }));
      toast.success(`Switched to ${newTheme} mode`);
    } catch (err) {
      console.error('Error updating theme:', err);
      toast.error('Failed to update theme');
    }
  };

  const handleAddEndorsement = async (skillId, endorsementData) => {
    try {
      const response = await profileAPI.addEndorsement(profile._id, skillId, endorsementData);
      
      // Update the profile with new endorsement
      setProfile(prev => {
        const updatedSkills = prev.skills.map(skill => 
          skill._id === skillId 
            ? response.data.skill 
            : skill
        );
        return {
          ...prev,
          skills: updatedSkills,
          totalEndorsements: response.data.totalEndorsements
        };
      });
      
      toast.success('Endorsement added successfully!');
    } catch (err) {
      console.error('Error adding endorsement:', err);
      toast.error('Failed to add endorsement');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops!</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchProfile}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>No Profile Found</h2>
          <p>Please run the seed script to create a sample profile.</p>
          <code>npm run seed</code>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-paper)',
            color: 'var(--color-ink)',
            border: '1px solid var(--color-mist)',
          },
        }}
      />

      <ProfileHeader 
        profile={profile}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onThemeToggle={handleThemeToggle}
      />

      <main className="main-content container">
        {isEditing ? (
          <EditProfile
            profile={profile}
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <AboutSection bio={profile.bio} />
            
            <SkillsSection 
              skills={profile.skills}
              profileId={profile._id}
              onAddEndorsement={handleAddEndorsement}
            />
            
            <WorkExperience experiences={profile.workExperience} />
            
            <Achievements achievements={profile.achievements} />
            
            <Interests interests={profile.interests} />
            
            <SocialLinks links={profile.socialLinks} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p className="font-mono">
            Built with React + Node.js • 
            <span className="accent">❤️</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
