-- Run these queries in your Supabase SQL Editor

-- 1. Create Profiles table (for role-based access)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin (avoids recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (public.is_admin());

-- Allow admins to update profiles
CREATE POLICY "Admins can update profiles" ON profiles
  FOR UPDATE USING (public.is_admin());

-- Allow admins to delete profiles
CREATE POLICY "Admins can delete profiles" ON profiles
  FOR DELETE USING (public.is_admin());

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'admin'); -- Defaulting first users to admin, or change to 'user'
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Create Case Studies Table
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('BUILD', 'DESIGN', 'GROW', 'PLAN')),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  read_time TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT NOT NULL,
  author JSONB NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on case studies
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to case studies
CREATE POLICY "Case studies are viewable by everyone" ON case_studies
  FOR SELECT USING (true);

-- Allow admins to insert/update/delete case studies
CREATE POLICY "Admins can insert case studies" ON case_studies
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update case studies" ON case_studies
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete case studies" ON case_studies
  FOR DELETE USING (public.is_admin());

-- 3. Create Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company_name TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public to insert testimonials
CREATE POLICY "Anyone can submit a testimonial" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Allow public to read testimonials
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (true);

-- Allow admins to delete/update testimonials
CREATE POLICY "Admins can manage testimonials" ON testimonials
  FOR ALL USING (public.is_admin());
