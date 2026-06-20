import { createClient } from '@supabase/supabase-js'
import { supabaseFetch } from './fetch'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: supabaseFetch,
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
