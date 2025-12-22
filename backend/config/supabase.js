import { createClient } from "@supabase/supabase-js";

// Server-side client for verifying tokens and fetching users
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;







// let cachedClient = null;

// async function getClient() {
//   // return cached client if already created
//   if (cachedClient) return cachedClient;
//   try {
//     const { createClient } = await import("@supabase/supabase-js");
//     cachedClient = createClient(
//       process.env.SUPABASE_URL,
//       process.env.SUPABASE_SERVICE_ROLE_KEY,
//       {
//         auth: {
//           autoRefreshToken: false,
//           persistSession: false,
//           detectSessionInUrl: false,
//         },
//       }
//     );
//     return cachedClient;
//   } catch (err) {
//     // rethrow so callers can handle or we return a consistent error shape below
//     throw err;
//   }
// }

// const supabase = {
//   auth: {
//     async getUser(access_token) {
//       try {
//         const client = await getClient();
//         return await client.auth.getUser(access_token);
//       } catch (error) {
//         // keep the same return shape as supabase (data, error)
//         return { data: null, error };
//       }
//     },
//     // ... add other wrappers (e.g., verifySession) if needed ...
//   },
//   // ...existing code...
// };

// export default supabase;
