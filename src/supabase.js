import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mjnjsgyxsxvyjkqegatb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbmpzZ3l4c3h2eWprcWVnYXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDc2NTksImV4cCI6MjA3Nzk4MzY1OX0.nvyixFh7e0PsvEqgpl2OQMCBDH-btOW1gzEBg3qZAuA'

export const supabase = createClient(supabaseUrl, supabaseKey)
