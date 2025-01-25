import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const SUPABASE_URL = 'https://estsfiytltbojkgfawqc.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdHNmaXl0bHRib2prZ2Zhd3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0Mjk5ODMsImV4cCI6MjA1MDAwNTk4M30.Vz_pS6wyIKe1iy2eIeOakvamtaJinTXZXs7xPvqV8L4'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   