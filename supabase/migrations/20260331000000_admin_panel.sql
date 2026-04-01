/*
  # Painel Administrativo e Perfis de Usuário
  Este script cria a estrutura necessária para gerenciar usuários, 
  prazos de acesso e permissões administrativas.

  ## Metadata:
  - Schema-Category: Structural
  - Impact-Level: Medium
  - Requires-Backup: true
  - Reversible: true
*/

-- 1. Criar a tabela de perfis vinculada ao Auth
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE,
  access_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança
-- Admins podem fazer tudo
CREATE POLICY "Admins possuem acesso total" ON public.user_profiles
  FOR ALL TO authenticated
  USING (
    (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = TRUE
  );

-- Usuários comuns podem ver apenas o próprio perfil
CREATE POLICY "Usuários veem o próprio perfil" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- 4. Gatilho para criar perfil automaticamente ao registrar novo usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger se já existir para evitar erro
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
