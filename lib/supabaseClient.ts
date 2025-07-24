import "./polyfills"; // Import polyfills first
import { createClient } from "@supabase/supabase-js";

/**
 * 1) These vars MUST start with NEXT_PUBLIC_ so that
 *    Next.js will bundle them into the browser.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** 2) Crash early if missing (dev or prod) */
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    `Missing Supabase environment variables. Please ensure you have:\n     - NEXT_PUBLIC_SUPABASE_URL\n     - NEXT_PUBLIC_SUPABASE_ANON_KEY\n     defined in your environment.`
  );
}

/**
 * 3) Export a *browser*‐safe client.
 *    Do NOT import this in your API routes or Server Components!
 */
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
