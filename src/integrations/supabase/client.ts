// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gkbepngtnwfohklsgukn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrYmVwbmd0bndmb2hrbHNndWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTE3NzYsImV4cCI6MjA2MTQyNzc3Nn0.tqKmgXc444f1pSgnng1dR_qIyRI2AoW3JFpom8hv2mE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);