import { createClient } from "@supabase/supabase-js";

// Use mock values for development if environment variables are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "example-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
