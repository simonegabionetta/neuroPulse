# NeuroPulse

Landing page MVP para apresentacao do NeuroPulse, um SaaS B2B de saude mental corporativa que ajuda RH e liderancas a identificar sinais de burnout antes que eles virem afastamentos.

## O que tem no MVP

- Frontend em Next.js 14 + TypeScript + Tailwind.
- Hero com video em tela cheia usando `frontend/public/hero-video.mp4`.
- Formulario de captura de leads.
- Backend Express local na porta `4000`.
- Banco local simples em JSON: `backend/data/leads.json`.
- Sem dependencia obrigatoria de Supabase, PostgreSQL ou servico externo.

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

Os leads enviados pelo formulario ficam em:

```txt
backend/data/leads.json
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

Crie `frontend/.env.local` com:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Para o backend, `backend/.env` e opcional para MVP local:

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Decisao sobre banco

Para este MVP, o banco local em JSON e suficiente porque o objetivo e apresentar a landing e demonstrar o fluxo de captura. Se o projeto avancar para uso real, a troca para Supabase, PostgreSQL ou outro banco pode ser feita depois sem mudar a interface da landing.
