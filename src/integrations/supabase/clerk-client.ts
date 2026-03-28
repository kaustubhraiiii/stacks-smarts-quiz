import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Creates a Supabase client authenticated with a Clerk JWT token.
 * This allows RLS policies that check `auth.uid()` to work with Clerk users.
 *
 * To use this, you must create a "supabase" JWT template in the Clerk Dashboard
 * that includes the Supabase JWT secret as the signing key.
 */
export function createClerkSupabaseClient(clerkToken: string | null) {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      headers: clerkToken
        ? { Authorization: `Bearer ${clerkToken}` }
        : {},
    },
  });
}
