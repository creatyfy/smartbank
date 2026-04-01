/*
  # Create Transactions Table
  
  ## Query Description:
  Cria uma tabela para armazenar o histórico de transações Pix.
  Isso serve como gatilho para notificações e histórico.

  ## Metadata:
  - Schema-Category: "Data"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: transactions
  - Columns: id, amount, receiver_name, receiver_cnpj, type, created_at
*/

create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  amount text not null,
  receiver_name text not null,
  receiver_cnpj text,
  type text default 'pix',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilita RLS (Segurança)
alter table public.transactions enable row level security;

-- Política simples: permite inserir e ler (para demonstração)
create policy "Enable insert for all users" on public.transactions for insert with check (true);
create policy "Enable read for all users" on public.transactions for select using (true);
