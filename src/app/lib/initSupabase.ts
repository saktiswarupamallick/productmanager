import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://llvaevcayjatqqigklxd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdmFldmNheWphdHFxaWdrbHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMzM4MzYsImV4cCI6MjAyMjYwOTgzNn0.QJd_ouJhxMNN2ST5cMB0uzxMzxKA_TLCwhPekouuxhg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Access
const service_role_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdmFldmNheWphdHFxaWdrbHhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzAzMzgzNiwiZXhwIjoyMDIyNjA5ODM2fQ.JOQwNMnaDu61-lwP99WrBcjHliSkcu9qfJ7q3gN-C_k";
const supabaseWithAdminRole = createClient(supabaseUrl, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
export const adminAuthClient = supabaseWithAdminRole.auth.admin;