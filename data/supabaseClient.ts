import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const SUPABASE_URL = 'https://wlehazjdmuyjexmxtwsz.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZWhhempkbXV5amV4bXh0d3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MjQ0ODAsImV4cCI6MjA1MzQwMDQ4MH0.NSTJ8ErV05rCXkQohSLy33ks3KC2UvcXJ7zlOIQj5x0'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   