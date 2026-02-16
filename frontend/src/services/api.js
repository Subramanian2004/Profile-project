import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Profile API endpoints
export const profileAPI = {
  // Get all profiles
  getAllProfiles: () => api.get('/profiles'),
  
  // Get profile by ID
  getProfile: (id) => api.get(`/profiles/${id}`),
  
  // Get profile by email
  getProfileByEmail: (email) => api.get(`/profiles/email/${email}`),
  
  // Create new profile
  createProfile: (data) => api.post('/profiles', data),
  
  // Update profile
  updateProfile: (id, data) => api.put(`/profiles/${id}`, data),
  
  // Delete profile
  deleteProfile: (id) => api.delete(`/profiles/${id}`),
  
  // Add endorsement to skill
  addEndorsement: (profileId, skillId, data) => 
    api.post(`/profiles/${profileId}/skills/${skillId}/endorse`, data),
  
  // Get skill endorsements
  getSkillEndorsements: (profileId, skillId) => 
    api.get(`/profiles/${profileId}/skills/${skillId}/endorsements`),
  
  // Update theme
  updateTheme: (id, theme) => 
    api.patch(`/profiles/${id}/theme`, { theme }),
  
  // Get profile stats
  getProfileStats: (id) => api.get(`/profiles/${id}/stats`),
};

export default api;
