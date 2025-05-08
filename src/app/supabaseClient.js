import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wrzxopcnrlzyewedkqsx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyenhvcGNucmx6eWV3ZWRrcXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3Mzc4NDcsImV4cCI6MjA2MjMxMzg0N30.O1r-g6STYlaflOCfHUSFfPYvyCJbv9WarCuzYA6gSj0'

export const supabase = createClient(supabaseUrl, supabaseKey)

