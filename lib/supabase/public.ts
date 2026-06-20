import { createClient } from '@supabase/supabase-js'
import { supabaseFetch } from './fetch'

// A universal client for fetching public data (works in both browser and server)
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: supabaseFetch,
    },
  }
)
