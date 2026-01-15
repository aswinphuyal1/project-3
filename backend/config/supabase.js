import { createClient } from "@supabase/supabase-js";

// Server-side client for verifying tokens and fetching users
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      // Disable automatic token refresh (server-side doesn't need it)
      autoRefreshToken: false,

      //Don't persist session in storage (server-side, no localStorage/cookies needed)
      persistSession: false,

      //Don't look for session tokens in URL (prevents OAuth callback handling)
      detectSessionInUrl: false,
    },
  }
);

export default supabase;


