// AI Controller - Calls Anthropic API from backend (avoids CORS)

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// Smart fallback bio generator (no API needed)
const generateFallbackBio = (profile, tone) => {
  const skills     = profile.skills?.slice(0, 3).map(s => s.name).join(', ') || 'modern technologies';
  const topSkill   = profile.skills?.[0]?.name || 'software development';
  const location   = profile.location ? `Based in ${profile.location}, ` : '';
  const experience = profile.workExperience?.[0];
  const role       = experience
    ? `${experience.title} at ${experience.company}`
    : profile.title;

  const bios = {
    professional: `${location}I am a ${profile.title} specialising in ${skills}. As ${role}, I bring a strong foundation in building scalable, user-focused solutions. Passionate about clean code and continuous learning, I thrive on turning complex challenges into elegant software.`,
    creative:     `Code is my canvas and ${topSkill} is my brush. ${location}I craft digital experiences as ${profile.title}, weaving together ${skills} to build products people love. Every line of code is an opportunity to solve a real problem beautifully.`,
    casual:       `Hey! I'm a ${profile.title} who loves building things with ${skills}. ${location}I spend my days writing code, solving interesting problems, and constantly picking up new skills. Always open to exciting projects and collaborations!`,
    technical:    `${profile.title} with hands-on expertise in ${skills}. ${location}Currently working as ${role}, focusing on performance, scalability, and maintainable architecture. Committed to engineering best practices and delivering high-quality software solutions.`,
  };

  return bios[tone] || bios.professional;
};

// Build the prompt from profile data
const buildPrompt = (profile, tone) => {
  const skillNames   = profile.skills?.map(s => s.name).join(', ')        || 'various skills';
  const interests    = profile.interests?.join(', ')                        || 'technology';
  const achievements = profile.achievements?.slice(0, 3).join(', ')        || '';
  const experience   = profile.workExperience?.length > 0
    ? `${profile.workExperience[0]?.title} at ${profile.workExperience[0]?.company}`
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

// @desc    Generate AI bio using Anthropic API
// @route   POST /api/profiles/generate-bio
// @access  Public
export const generateBio = async (req, res) => {
  const { profile, tone = 'professional' } = req.body;

  if (!profile) {
    return res.status(400).json({ message: 'Profile data is required' });
  }

  // If no API key, use smart fallback immediately
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('No Anthropic API key found, using fallback bio generator');
    const fallbackBio = generateFallbackBio(profile, tone);
    return res.json({ bio: fallbackBio, source: 'fallback' });
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [
          { role: 'user', content: buildPrompt(profile, tone) }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();

    if (data?.content?.[0]?.text) {
      return res.json({ bio: data.content[0].text.trim(), source: 'ai' });
    }

    throw new Error('Invalid response from Anthropic API');

  } catch (error) {
    console.error('AI generation error, using fallback:', error.message);
    // Always fall back gracefully - never show an error to the user
    const fallbackBio = generateFallbackBio(profile, tone);
    return res.json({ bio: fallbackBio, source: 'fallback' });
  }
};
