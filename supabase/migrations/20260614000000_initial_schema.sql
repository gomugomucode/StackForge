-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  github_url TEXT,
  website_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PROGRESS
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_slug TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'tutorial', 'roadmap', 'project', etc.
  status TEXT DEFAULT 'in-progress', -- 'in-progress', 'completed'
  progress_percent INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_slug)
);

-- 3. ACHIEVEMENTS
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- 4. BOOKMARKS
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_slug TEXT NOT NULL,
  content_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_slug)
);

-- 5. NOTES
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_slug TEXT NOT NULL,
  content: TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CERTIFICATES
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_slug TEXT NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verification_code TEXT UNIQUE NOT NULL,
  metadata JSONB -- Store completion details
);

-- 7. LEARNING HISTORY (for Analytics)
CREATE TABLE learning_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_slug TEXT NOT NULL,
  duration_seconds INTEGER DEFAULT 0,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES

-- Profiles: Publicly readable, owner editable
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Progress: Owner only
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own progress" ON progress FOR ALL USING (auth.uid() = id);

-- Achievements: Publicly viewable (for profiles), owner only for mutations
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements are viewable by everyone" ON user_achievements FOR SELECT USING (true);
CREATE POLICY "Users can manage own achievements" ON user_achievements FOR ALL USING (auth.uid() = id);

-- Bookmarks: Owner only
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = id);

-- Notes: Owner only
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notes" ON notes FOR ALL USING (auth.uid() = id);

-- Certificates: Publicly viewable (via verification), owner only for management
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Certificates are viewable by everyone" ON certificates FOR SELECT USING (true);
CREATE POLICY "Users can manage own certificates" ON certificates FOR ALL USING (auth.uid() = id);

-- History: Owner only
ALTER TABLE learning_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own history" ON learning_history FOR ALL USING (auth.uid() = id);
