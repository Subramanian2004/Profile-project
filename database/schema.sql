-- Supabase Database Schema for Profile Project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    bio TEXT,
    profile_picture TEXT DEFAULT 'https://via.placeholder.com/150',
    location VARCHAR(255),
    phone VARCHAR(50),
    website VARCHAR(255),
    availability VARCHAR(50) DEFAULT 'Open to Opportunities',
    theme VARCHAR(20) DEFAULT 'light',
    total_endorsements INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(50) DEFAULT 'Intermediate',
    years_of_experience INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Endorsements table
CREATE TABLE endorsements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    endorser_name VARCHAR(255) NOT NULL,
    endorser_email VARCHAR(255) NOT NULL,
    endorser_avatar TEXT,
    message TEXT,
    endorsed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social Links table
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    platform VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(50)
);

-- Work Experience table
CREATE TABLE work_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Achievements table (as array in profile for simplicity)
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement TEXT NOT NULL
);

-- Interests table
CREATE TABLE interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interest VARCHAR(255) NOT NULL
);

-- Work Experience Achievements table
CREATE TABLE work_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_experience_id UUID REFERENCES work_experience(id) ON DELETE CASCADE,
    achievement TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_skills_profile_id ON skills(profile_id);
CREATE INDEX idx_endorsements_skill_id ON endorsements(skill_id);
CREATE INDEX idx_social_links_profile_id ON social_links(profile_id);
CREATE INDEX idx_work_experience_profile_id ON work_experience(profile_id);
CREATE INDEX idx_achievements_profile_id ON achievements(profile_id);
CREATE INDEX idx_interests_profile_id ON interests(profile_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data insert
INSERT INTO profiles (name, email, title, bio, profile_picture, location, phone, website, availability, theme)
VALUES (
    'Jane Developer',
    'jane.developer@example.com',
    'Full-Stack Developer & UI/UX Designer',
    'Passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating beautiful, user-friendly interfaces and solving complex problems with elegant code.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'San Francisco, CA',
    '+1 (555) 123-4567',
    'https://janedeveloper.com',
    'Open to Opportunities',
    'light'
);

-- Get the profile ID for inserting related data
DO $$
DECLARE
    profile_uuid UUID;
    js_skill_id UUID;
    react_skill_id UUID;
    node_skill_id UUID;
    mongo_skill_id UUID;
    design_skill_id UUID;
    ts_skill_id UUID;
    work_exp_1 UUID;
    work_exp_2 UUID;
BEGIN
    -- Get profile ID
    SELECT id INTO profile_uuid FROM profiles WHERE email = 'jane.developer@example.com';

    -- Insert skills
    INSERT INTO skills (profile_id, name, level, years_of_experience)
    VALUES 
        (profile_uuid, 'JavaScript', 'Expert', 5) RETURNING id INTO js_skill_id;
    
    INSERT INTO skills (profile_id, name, level, years_of_experience)
    VALUES 
        (profile_uuid, 'React', 'Expert', 4) RETURNING id INTO react_skill_id;
    
    INSERT INTO skills (profile_id, name, level, years_of_experience)
    VALUES 
        (profile_uuid, 'Node.js', 'Advanced', 4) RETURNING id INTO node_skill_id;
    
    INSERT INTO skills (profile_id, name, level, years_of_experience)
    VALUES 
        (profile_uuid, 'MongoDB', 'Advanced', 3) RETURNING id INTO mongo_skill_id;
    
    INSERT INTO skills (profile_id, name, level, years_of_experience)
    VALUES 
        (profile_uuid, 'UI/UX Design', 'Advanced', 5) RETURNING id INTO design_skill_id;
    
    INSERT INTO skills (profile_id, name, level, years_of_experience)
    VALUES 
        (profile_uuid, 'TypeScript', 'Advanced', 3) RETURNING id INTO ts_skill_id;

    -- Insert endorsements for JavaScript
    INSERT INTO endorsements (skill_id, skill_name, endorser_name, endorser_email, endorser_avatar, message, endorsed_at)
    VALUES 
        (js_skill_id, 'JavaScript', 'John Smith', 'john@example.com', 'https://i.pravatar.cc/150?img=12', 'Jane is an exceptional JavaScript developer!', '2024-01-15'),
        (js_skill_id, 'JavaScript', 'Sarah Johnson', 'sarah@example.com', 'https://i.pravatar.cc/150?img=45', 'Outstanding JS skills and problem-solving ability.', '2024-02-10');

    -- Insert endorsement for React
    INSERT INTO endorsements (skill_id, skill_name, endorser_name, endorser_email, endorser_avatar, message, endorsed_at)
    VALUES 
        (react_skill_id, 'React', 'Mike Chen', 'mike@example.com', 'https://i.pravatar.cc/150?img=33', 'Best React developer I have worked with!', '2024-01-20');

    -- Insert endorsement for UI/UX Design
    INSERT INTO endorsements (skill_id, skill_name, endorser_name, endorser_email, endorser_avatar, message, endorsed_at)
    VALUES 
        (design_skill_id, 'UI/UX Design', 'Emily Davis', 'emily@example.com', 'https://i.pravatar.cc/150?img=25', 'Jane has an incredible eye for design!', '2024-02-05');

    -- Insert social links
    INSERT INTO social_links (profile_id, platform, url, icon)
    VALUES 
        (profile_uuid, 'GitHub', 'https://github.com/janedeveloper', 'github'),
        (profile_uuid, 'LinkedIn', 'https://linkedin.com/in/janedeveloper', 'linkedin'),
        (profile_uuid, 'Twitter', 'https://twitter.com/janedeveloper', 'twitter'),
        (profile_uuid, 'Portfolio', 'https://janedeveloper.com', 'globe');

    -- Insert work experience
    INSERT INTO work_experience (profile_id, title, company, location, start_date, is_current, description)
    VALUES 
        (profile_uuid, 'Senior Full-Stack Developer', 'Tech Innovators Inc.', 'San Francisco, CA', '2021-06-01', true, 'Leading the development of scalable web applications using React, Node.js, and MongoDB.')
        RETURNING id INTO work_exp_1;

    INSERT INTO work_experience (profile_id, title, company, location, start_date, end_date, is_current, description)
    VALUES 
        (profile_uuid, 'Full-Stack Developer', 'StartUp Labs', 'San Francisco, CA', '2019-03-01', '2021-05-31', false, 'Developed full-stack web applications and collaborated with design team on UI/UX improvements.')
        RETURNING id INTO work_exp_2;

    -- Insert work achievements
    INSERT INTO work_achievements (work_experience_id, achievement)
    VALUES 
        (work_exp_1, 'Architected and deployed 3 major product features serving 100K+ users'),
        (work_exp_1, 'Reduced API response time by 40% through optimization'),
        (work_exp_1, 'Mentored 5 junior developers'),
        (work_exp_2, 'Built responsive web applications from scratch'),
        (work_exp_2, 'Improved page load time by 50%'),
        (work_exp_2, 'Implemented CI/CD pipeline');

    -- Insert achievements
    INSERT INTO achievements (profile_id, achievement)
    VALUES 
        (profile_uuid, 'AWS Certified Solutions Architect'),
        (profile_uuid, 'Winner of TechCrunch Hackathon 2023'),
        (profile_uuid, 'Speaker at React Conference 2024'),
        (profile_uuid, 'Published article on CSS-Tricks');

    -- Insert interests
    INSERT INTO interests (profile_id, interest)
    VALUES 
        (profile_uuid, 'Open Source'),
        (profile_uuid, 'Web Performance'),
        (profile_uuid, 'UI/UX Design'),
        (profile_uuid, 'Tech Blogging'),
        (profile_uuid, 'Photography');

    -- Update total endorsements count
    UPDATE profiles 
    SET total_endorsements = (
        SELECT COUNT(*) 
        FROM endorsements e 
        JOIN skills s ON e.skill_id = s.id 
        WHERE s.profile_id = profile_uuid
    )
    WHERE id = profile_uuid;
END $$;
