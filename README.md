# NeuroPulse

Landing page MVP para apresentacao do NeuroPulse, um SaaS B2B de saude mental corporativa que ajuda RH e liderancas a identificar sinais de burnout antes que eles virem afastamentos.

## O que tem no MVP

- Frontend em Next.js 14 + TypeScript + Tailwind.
- Hero com video em tela cheia usando `frontend/public/hero-video.mp4`.
- Formulario de captura de leads.
- Backend Express local na porta `4000`.
- Banco Supabase/PostgreSQL para armazenar os leads.

## Como rodar

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

API local:

```txt
http://localhost:4000
```

Health check:

```txt
http://localhost:4000/health
```

Antes de enviar leads, crie a tabela no Supabase rodando o arquivo:

```txt
schema.sql
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Landing page:

```txt
http://localhost:3000
```

## Variaveis de ambiente

Crie `backend/.env` a partir de `backend/.env.example`:

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

Crie `frontend/.env.local` a partir de `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=https://neuropulse.com.br
NEXT_PUBLIC_GA_ID=G-SEU_ID_DO_GOOGLE_ANALYTICS
```

## Decisao sobre banco

O backend usa a chave `service_role` do Supabase para inserir leads com seguranca. Essa chave deve ficar apenas no backend e nunca deve ser exposta no frontend.
