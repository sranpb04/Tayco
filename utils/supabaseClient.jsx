import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabase = createClient(
  'https://lyptuladwzfxpqzpkmut.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cHR1bGFkd3pmeHBxenBrbXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1Mzk2MzEsImV4cCI6MjA0NDExNTYzMX0.rh7rQFV1SoHRQN2EgiEiybz6ftdo35EMtsiTn0T97K0',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;