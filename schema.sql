-- ============================================
-- NeuroPulse - Schema SQL
-- Tabela: leads
-- Supabase (PostgreSQL) com Row Level Security
-- ============================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela leads
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  empresa VARCHAR(200) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  colaboradores VARCHAR(10) NOT NULL CHECK (colaboradores IN ('50-100', '100-200', '200-500', '500+')),
  mensagem TEXT DEFAULT NULL,
  origem VARCHAR(500) DEFAULT 'direct',
  ip_hash VARCHAR(20) DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_colaboradores ON public.leads(colaboradores);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Bloquear SELECT para anon (nenhuma role anônima pode ler)
-- Não criamos nenhuma política de SELECT, o que significa que
-- nenhuma role terá acesso de leitura por padrão.

-- Permitir INSERT apenas via service_role (backend)
CREATE POLICY "Service role can insert leads"
  ON public.leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Permitir SELECT apenas via service_role (backend)
CREATE POLICY "Service role can read leads"
  ON public.leads
  FOR SELECT
  TO service_role
  USING (true);

-- Bloquear tudo para a role anon
CREATE POLICY "Block anon access"
  ON public.leads
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- ============================================
-- Comentários
-- ============================================
COMMENT ON TABLE public.leads IS 'Leads capturados pela landing page NeuroPulse';
COMMENT ON COLUMN public.leads.ip_hash IS 'Hash do IP para rate-limiting sem armazenar IP real';
COMMENT ON COLUMN public.leads.colaboradores IS 'Faixa de colaboradores: 50-100, 100-200, 200-500, 500+';
COMMENT ON COLUMN public.leads.origem IS 'URL de origem do lead (referer)';
