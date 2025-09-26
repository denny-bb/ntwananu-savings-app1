# Ntwananu Savings App

App web full-stack para gerenciamento de poupança coletiva, baseado no Estatuto do Grupo Ntwananu wa Mindjangu. Digitaliza contribuições, rotações e regras (multas, eleições).

## Requisitos
- Node.js 18+
- PostgreSQL 14+
- Git

## Setup Rápido
1. Repo`git clone https://github.com/denny-bb/ntwananu-savings-app.git`
2. Instale dependências:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
3. Configure DB:
   - Instale PostgreSQL ou use Docker: `docker-compose up -d`
   - Rode: `psql -U postgres -d poupanca -f ../database/schema.sql`
   - Seed: `psql -U postgres -d poupanca -f ../database/seed.sql`
4. Crie .env no backend (copie de .env.example):
   - DB_URL=postgresql://user:pass@localhost:5432/poupanca
   - JWT_SECRET=seu_segredo_aqui (gere um forte)
   - PORT=5000
5. Rode:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm start`
6. Acesse: http://localhost:3000
   - Login: Use credenciais do seed (ex.: admin@grupo.com / senha123)

## Features
- Autenticação JWT para membros.
- Contribuições com multas automáticas (5% por atraso).
- Rotações mensais (sorteio simples de beneficiário).
- Dashboard com gráficos (Chart.js).
- Admin: Gerencie membros e relatórios.
- Conformidade: Logs para auditoria, conforme estatuto.

## Deploy
- Backend: Heroku (crie app, adicione DB add-on, push com git).
- Frontend: Vercel (conecte repo, deploy auto).
- Custos: Gratuito para básico; Stripe para pagamentos reais (~2% por transação).

## Contribuições
Baseado no PDF do estatuto: Contribuições fixas (ex.: 10.000 AKZ/mês), rotação para 10 membros, multas e assembleias virtuais.

## Licença
MIT - Livre para uso comunitário.
