import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

// Usando as variáveis de ambiente do arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cliente secundário para criação de usuários (evita deslogar o Admin)
const authAdminClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createUser(email: string, password: string, fullName: string, days: number, isAdmin: boolean) {
  // 1. Cria o usuário no Auth
  const { data, error: signUpError } = await authAdminClient.auth.signUp({ 
    email, 
    password,
    options: { data: { full_name: fullName } }
  });
  
  if (signUpError) throw signUpError;
  const userId = data.user?.id;
  if (!userId) throw new Error('Falha ao gerar ID do usuário');

  // 2. Define a data de expiração
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  // 3. Garante que o perfil exista (Upsert)
  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      email: email,
      full_name: fullName,
      access_expires_at: expiresAt.toISOString(),
      is_admin: isAdmin,
      is_blocked: false
    });

  if (profileError) throw profileError;
  
  return { email, password };
}

export async function addDaysToUser(userId: string, currentExpiry: string | null, days: number) {
  const now = new Date();
  const base = currentExpiry && new Date(currentExpiry) > now ? new Date(currentExpiry) : now;
  base.setDate(base.getDate() + days);
  
  const { error } = await supabase
    .from('user_profiles')
    .update({ access_expires_at: base.toISOString(), is_blocked: false })
    .eq('id', userId);

  if (error) throw error;
}

export async function toggleBlockUser(userId: string, blocked: boolean) {
  const { error } = await supabase
    .from('user_profiles')
    .update({ is_blocked: blocked })
    .eq('id', userId);

  if (error) throw error;
}

export async function revokeAccess(userId: string) {
  const { error } = await supabase
    .from('user_profiles')
    .update({ access_expires_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw error;
}
