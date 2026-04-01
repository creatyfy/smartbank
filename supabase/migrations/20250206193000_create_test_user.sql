/*
  # Create Test User
  Creates a test user in the auth.users table.

  ## Query Description:
  This operation inserts a specific test user (hiagocreaty.fy@gmail.com) into the Supabase auth system securely, hashing the password.
  
  ## Metadata:
  - Schema-Category: "Data"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  Inserts into auth.users and auth.identities.
*/

DO $$
DECLARE
  new_user_id UUID := gen_random_uuid();
BEGIN
  -- Verifica se o usuário já existe para evitar erros de duplicidade
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'hiagocreaty.fy@gmail.com') THEN
    
    -- Insere o usuário na tabela auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'hiagocreaty.fy@gmail.com',
      crypt('123456', gen_salt('bf')), -- Criptografa a senha '123456'
      now(), -- Confirma o e-mail automaticamente
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now()
    );

    -- Insere a identidade do usuário (necessário nas versões recentes do Supabase)
    INSERT INTO auth.identities (
      id,
      user_id,
      provider_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      new_user_id,
      new_user_id::text,
      jsonb_build_object('sub', new_user_id::text, 'email', 'hiagocreaty.fy@gmail.com'),
      'email',
      now(),
      now(),
      now()
    );
    
  END IF;
END $$;
