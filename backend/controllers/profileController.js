import { supabase } from '../config/supabase.js';

// Helper function to get complete profile with relations
const getCompleteProfile = async (profileId) => {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (profileError) throw profileError;

  // Get skills with endorsements
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select(`
      *,
      endorsements (*)
    `)
    .eq('profile_id', profileId);

  if (skillsError) throw skillsError;

  // Get social links
  const { data: socialLinks, error: socialError } = await supabase
    .from('social_links')
    .select('*')
    .eq('profile_id', profileId);

  if (socialError) throw socialError;

  // Get work experience with achievements
  const { data: workExperience, error: workError } = await supabase
    .from('work_experience')
    .select(`
      *,
      work_achievements (achievement)
    `)
    .eq('profile_id', profileId)
    .order('start_date', { ascending: false });

  if (workError) throw workError;

  // Format work experience
  const formattedWorkExp = workExperience.map(exp => ({
    ...exp,
    current: exp.is_current,
    achievements: exp.work_achievements.map(a => a.achievement)
  }));

  // Get achievements
  const { data: achievements, error: achError } = await supabase
    .from('achievements')
    .select('achievement')
    .eq('profile_id', profileId);

  if (achError) throw achError;

  // Get interests
  const { data: interests, error: intError } = await supabase
    .from('interests')
    .select('interest')
    .eq('profile_id', profileId);

  if (intError) throw intError;

  return {
    _id: profile.id,
    ...profile,
    skills: skills || [],
    socialLinks: socialLinks || [],
    workExperience: formattedWorkExp || [],
    achievements: achievements?.map(a => a.achievement) || [],
    interests: interests?.map(i => i.interest) || [],
    createdAt: profile.created_at,
    updatedAt: profile.updated_at
  };
};

// @desc    Get profile by ID
// @route   GET /api/profiles/:id
export const getProfile = async (req, res) => {
  try {
    const profile = await getCompleteProfile(req.params.id);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get profile by email
// @route   GET /api/profiles/email/:email
export const getProfileByEmail = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', req.params.email)
      .single();

    if (error) throw error;
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const completeProfile = await getCompleteProfile(profile.id);
    res.json(completeProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all profiles
// @route   GET /api/profiles
export const getAllProfiles = async (req, res) => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get complete data for each profile
    const completeProfiles = await Promise.all(
      profiles.map(p => getCompleteProfile(p.id))
    );

    res.json(completeProfiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new profile
// @route   POST /api/profiles
export const createProfile = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert([{
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        bio: req.body.bio,
        profile_picture: req.body.profilePicture,
        location: req.body.location,
        phone: req.body.phone,
        website: req.body.website,
        availability: req.body.availability,
        theme: req.body.theme || 'light'
      }])
      .select()
      .single();

    if (error) throw error;

    const completeProfile = await getCompleteProfile(profile.id);
    res.status(201).json(completeProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profiles/:id
export const updateProfile = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body.profilePicture !== undefined) updateData.profile_picture = req.body.profilePicture;
    if (req.body.profile_picture !== undefined) updateData.profile_picture = req.body.profile_picture;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.website !== undefined) updateData.website = req.body.website;
    if (req.body.availability !== undefined) updateData.availability = req.body.availability;
    if (req.body.theme !== undefined) updateData.theme = req.body.theme;

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    const completeProfile = await getCompleteProfile(profile.id);
    res.json(completeProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
export const deleteProfile = async (req, res) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add skill endorsement
// @route   POST /api/profiles/:id/skills/:skillId/endorse
export const addEndorsement = async (req, res) => {
  try {
    const { skillId } = req.params;
    
    // Get skill info
    const { data: skill, error: skillError } = await supabase
      .from('skills')
      .select('*, profile_id')
      .eq('id', skillId)
      .single();

    if (skillError) throw skillError;
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Add endorsement
    const { data: endorsement, error: endorseError } = await supabase
      .from('endorsements')
      .insert([{
        skill_id: skillId,
        skill_name: skill.name,
        endorser_name: req.body.endorsedBy.name,
        endorser_email: req.body.endorsedBy.email,
        endorser_avatar: req.body.endorsedBy.avatar || `https://i.pravatar.cc/150?u=${req.body.endorsedBy.email}`,
        message: req.body.message
      }])
      .select()
      .single();

    if (endorseError) throw endorseError;

    // Update total endorsements count
    const { data: endorsementCount } = await supabase
      .from('endorsements')
      .select('id', { count: 'exact', head: true })
      .eq('skill_id', skillId);

    await supabase
      .from('profiles')
      .update({ 
        total_endorsements: supabase.rpc('get_total_endorsements', { prof_id: skill.profile_id })
      })
      .eq('id', skill.profile_id);

    // Get updated skill with endorsements
    const { data: updatedSkill } = await supabase
      .from('skills')
      .select(`*, endorsements (*)`)
      .eq('id', skillId)
      .single();

    res.status(201).json({
      message: 'Endorsement added successfully',
      skill: updatedSkill,
      endorsement
    });
  } catch (error) {
    console.error('Error adding endorsement:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get skill endorsements
// @route   GET /api/profiles/:id/skills/:skillId/endorsements
export const getSkillEndorsements = async (req, res) => {
  try {
    const { data: endorsements, error } = await supabase
      .from('endorsements')
      .select('*')
      .eq('skill_id', req.params.skillId)
      .order('endorsed_at', { ascending: false });

    if (error) throw error;

    res.json({
      endorsements: endorsements || []
    });
  } catch (error) {
    console.error('Error fetching endorsements:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update theme preference
// @route   PATCH /api/profiles/:id/theme
export const updateTheme = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({ theme: req.body.theme })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ theme: profile.theme });
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get profile statistics
// @route   GET /api/profiles/:id/stats
export const getProfileStats = async (req, res) => {
  try {
    const profile = await getCompleteProfile(req.params.id);

    const stats = {
      totalSkills: profile.skills.length,
      totalEndorsements: profile.total_endorsements || 0,
      totalWorkExperience: profile.workExperience.length,
      totalSocialLinks: profile.socialLinks.length,
      profileCompleteness: calculateProfileCompleteness(profile)
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate profile completeness
const calculateProfileCompleteness = (profile) => {
  let completeness = 0;
  const fields = [
    'name', 'email', 'title', 'bio', 'profile_picture',
    'location', 'phone', 'website'
  ];

  fields.forEach(field => {
    if (profile[field] && profile[field] !== '') completeness += 12.5;
  });

  if (profile.skills && profile.skills.length > 0) completeness += 12.5;
  if (profile.socialLinks && profile.socialLinks.length > 0) completeness += 12.5;
  if (profile.workExperience && profile.workExperience.length > 0) completeness += 12.5;
  if (profile.achievements && profile.achievements.length > 0) completeness += 12.5;

  return Math.round(completeness);
};
