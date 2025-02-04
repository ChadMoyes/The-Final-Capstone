import { createClient } from '@supabase/supabase-js'

// My Supabase URL and anon key 
const supabaseUrl = 'https://tcpztriubgcqfumptbiu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcHp0cml1YmdjcWZ1bXB0Yml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MzIwNjYsImV4cCI6MjA1NDIwODA2Nn0.gO9veh6gbwN4zu6AW_7sRAAHVEfsV_yRFHkX891o2nw'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
