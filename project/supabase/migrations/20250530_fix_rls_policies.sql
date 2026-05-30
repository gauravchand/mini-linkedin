-- Fix RLS policies to allow signup with anon key

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Allow anyone to insert profiles (for signup)
CREATE POLICY "Allow insert on profiles"
  ON profiles
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read profiles (public profiles)
CREATE POLICY "Allow read on profiles"
  ON profiles
  FOR SELECT
  USING (true);

-- Allow authenticated users to update their own profile only
CREATE POLICY "Allow update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to delete their own profile
CREATE POLICY "Allow delete own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);
