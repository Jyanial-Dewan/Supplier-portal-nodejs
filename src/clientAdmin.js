import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = String(import.meta.env.VITE_REACT_APP_SUPABASE_URL)

export const supabaseKey = String(import.meta.env.VITE_REACT_APP_SUPABASE_SERVICE_ROLE_KEY)
export const supabase = createClient(supabaseUrl, supabaseKey)