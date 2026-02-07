-- Create scholarships table
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  test_schedule TEXT,
  scholarship_percentage INT,
  target_classes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scholarship_id UUID NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  class_level TEXT,
  status TEXT DEFAULT 'registered',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for scholarships (public read)
CREATE POLICY "Scholarships are viewable by everyone" ON public.scholarships FOR SELECT USING (true);

-- Create RLS policies for registrations (users can only view/edit their own)
CREATE POLICY "Users can view their own registrations" ON public.registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own registrations" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registrations" ON public.registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own registrations" ON public.registrations FOR DELETE USING (auth.uid() = user_id);

-- Insert default scholarship
INSERT INTO public.scholarships (title, description, test_schedule, scholarship_percentage, target_classes)
VALUES (
  'CBSE Scholarship Test',
  'Get up to 90% scholarship on online subscriptions. Exclusive All India Scholarship Test for CBSE students.',
  'Every Sunday, 12 PM',
  90,
  'Class 6 - 12'
) ON CONFLICT DO NOTHING;
