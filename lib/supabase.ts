import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndoztrtyznwazrjxjvek.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kb3p0cnR5em53YXpyanhqdmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjIxNTgsImV4cCI6MjEwNDUzODE1OH0.9wXZ1pKITMc4HmIR3KxzO2FKhULVwiLeMzPPk01SqC4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
  },
});
