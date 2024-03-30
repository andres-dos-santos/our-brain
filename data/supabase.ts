import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yizgqcksyzbdojgrejrx.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpemdxY2tzeXpiZG9qZ3JlanJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NTU3MTEsImV4cCI6MjAyNzMzMTcxMX0.m7gYbEWSAsA8onZyObMEeDkJtdddzHZCua9MaIjmv7E';
export const supabase = createClient(supabaseUrl, supabaseKey);
