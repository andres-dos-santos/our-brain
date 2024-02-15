import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://tojtxclhqaoskbczndkf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvanR4Y2xocWFvc2tiY3puZGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMzc3NzksImV4cCI6MjAyMTcxMzc3OX0.tpoFMmpHD_EEiTps-FEw7DEUrj5phkBrGiRW-z7Al7A',
)
