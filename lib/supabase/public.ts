import { createClient } from '@supabase/supabase-js'

// A universal client for fetching public data (works in both browser and server)
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
