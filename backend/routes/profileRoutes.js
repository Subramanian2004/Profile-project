import express from 'express';
import {
  getProfile,
  getProfileByEmail,
  getAllProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  addEndorsement,
  getSkillEndorsements,
  updateTheme,
  getProfileStats
} from '../controllers/profileController.js';
import { generateBio } from '../controllers/aiController.js';

const router = express.Router();

// Profile routes
router.get('/', getAllProfiles);
router.get('/:id', getProfile);
router.get('/email/:email', getProfileByEmail);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

// Endorsement routes
router.post('/:id/skills/:skillId/endorse', addEndorsement);
router.get('/:id/skills/:skillId/endorsements', getSkillEndorsements);

// Theme and stats routes
router.patch('/:id/theme', updateTheme);
router.get('/:id/stats', getProfileStats);

// AI Bio Generator route
router.post('/generate-bio', generateBio);

export default router;
