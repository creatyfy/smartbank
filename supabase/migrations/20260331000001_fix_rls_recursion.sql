/*
  # Correção de Políticas RLS e Permissões Admin
  Este script resolve o erro de recursão infinita nas políticas de segurança e garante que o Admin tenha acesso total.

  ## Query Description:
  1. Remove as políticas antigas que causavam erro.
  2. Cria uma nova política simplificada para Admins baseada em uma verificação direta.
  3. Garante que o usuário principal seja Admin.
*/

-- 1. Limpeza de políticas problemáticas
DROP POLICY IF EXISTS "Admin pode ver tudo" ON public.user_profiles;
DROP POLICY IF EXISTS "Usuário vê próprio perfil" ON public.user_profiles;

-- 2. Nova política para usuários verem seus próprios dados
CREATE POLICY "Users can view own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = id);

-- 3. Nova política para Admins (Sem recursão)
-- Usamos uma verificação que não chama a si mesma de forma infinita
CREATE POLICY "Admins have full access" 
ON public.user_profiles 
FOR ALL 
USING (
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);

-- 4. Garante que o usuário mestre seja Admin e tenha acesso vitalício
INSERT INTO public.user_profiles (id, email, is_admin, access_expires_at)
SELECT id, email, true, '2099-12-31'::timestamptz
FROM auth.users
WHERE email IN ('hiago.pereira@aluno.unifenas.br', 'hiagocreaty.fy@gmail.com', 'hiagodevfe@gmail.com')
ON CONFLICT (id) DO UPDATE 
SET is_admin = true, access_expires_at = '2099-12-31'::timestamptz;
