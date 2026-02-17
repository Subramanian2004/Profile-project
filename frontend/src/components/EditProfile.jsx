import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import './EditProfile.css';

const EditProfile = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    title: profile.title || '',
    bio: profile.bio || '',
    location: profile.location || '',
    phone: profile.phone || '',
    website: profile.website || '',
    profile_picture: profile.profile_picture || profile.profilePicture || '',
    availability: profile.availability || 'Open to Opportunities',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      className="edit-profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="edit-header">
        <h2>Edit Profile</h2>
        <button className="icon-button" onClick={onCancel}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Title / Role</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Full-Stack Developer"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="form-group">
            <label>Profile Picture URL</label>
            <input
              type="url"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
              placeholder="/WhatsApp Image 2026-02-10 at 5.12.53 AM.jpeg"
            />
            {formData.profile_picture && (
              <div className="image-preview">
                <img src={formData.profile_picture} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="form-group">
            <label>Availability Status</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
              <option value="Open to Opportunities">Open to Opportunities</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            <X size={18} />
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProfile;
