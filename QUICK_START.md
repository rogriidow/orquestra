# 🚀 Quick Start - Orquestra de Potenciais

## ⚡ Início Rápido (5 minutos)

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+

### 1. Banco de Dados

```bash
# Criar banco de dados PostgreSQL
psql -U postgres
CREATE DATABASE orquestra_potenciais;
\q
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env

# Edite .env e configure DATABASE_URL
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/orquestra_potenciais"

npx prisma generate
npx prisma migrate dev
npm run prisma:seed  # Dados de demo

npm run dev  # Inicia em http://localhost:3001
```

### 3. Frontend

```bash
cd ../frontend
npm install
cp .env.example .env

npm run dev  # Inicia em http://localhost:5173
```

### 4. Acesse e Teste

Abra http://localhost:5173

**Credenciais de Demo:**
- Email: `maestro@orquestra.com`
- Senha: `maestro123`

## 📦 O que foi implementado

### Backend - API REST completa

#### Autenticação & Usuários
- ✅ POST `/api/auth/register` - Registrar novo usuário
- ✅ POST `/api/auth/login` - Login
- ✅ GET `/api/auth/profile` - Perfil do usuário
- ✅ PUT `/api/auth/profile` - Atualizar perfil

#### Equipes
- ✅ POST `/api/teams` - Criar equipe
- ✅ GET `/api/teams` - Listar equipes
- ✅ GET `/api/teams/:id` - Detalhes da equipe
- ✅ PUT `/api/teams/:id` - Atualizar equipe
- ✅ DELETE `/api/teams/:id` - Deletar equipe
- ✅ POST `/api/teams/:id/members` - Adicionar membro
- ✅ DELETE `/api/teams/:id/members/:memberId` - Remover membro

#### Avaliações de Energia
- ✅ POST `/api/assessments/energy` - Criar avaliação de energia
- ✅ GET `/api/assessments/energy/:userId` - Histórico de energia
- ✅ GET `/api/assessments/energy/:userId/latest` - Última avaliação
- ✅ GET `/api/assessments/team/:teamId/energy` - Energia da equipe

#### Avaliações de Necessidades (Maslow)
- ✅ POST `/api/assessments/needs` - Criar avaliação de necessidades
- ✅ GET `/api/assessments/needs/:userId` - Histórico
- ✅ GET `/api/assessments/needs/:userId/latest` - Última avaliação

#### Radar de Performance
- ✅ POST `/api/assessments/performance` - Criar avaliação
- ✅ GET `/api/assessments/performance/:userId` - Histórico

#### Radar de Bem-Estar
- ✅ POST `/api/assessments/wellbeing` - Criar avaliação
- ✅ GET `/api/assessments/wellbeing/:userId` - Histórico

#### Linguagens de Valorização
- ✅ GET `/api/appreciation/questions` - Obter questionário
- ✅ POST `/api/appreciation/submit` - Submeter respostas
- ✅ GET `/api/appreciation/profile/:userId` - Perfil

#### Biblioteca de Rituais
- ✅ POST `/api/rituals` - Criar ritual
- ✅ GET `/api/rituals` - Listar rituais
- ✅ GET `/api/rituals/:id` - Detalhes do ritual
- ✅ PUT `/api/rituals/:id` - Atualizar ritual
- ✅ DELETE `/api/rituals/:id` - Deletar ritual

#### Feedback 360°
- ✅ POST `/api/feedback` - Criar feedback
- ✅ GET `/api/feedback/received` - Feedbacks recebidos
- ✅ GET `/api/feedback/given` - Feedbacks dados

#### Trilhas de Desenvolvimento
- ✅ POST `/api/development` - Criar trilha
- ✅ GET `/api/development/:userId` - Trilhas do usuário
- ✅ PUT `/api/development/:id` - Atualizar trilha
- ✅ POST `/api/development/:id/complete` - Completar trilha

#### Sistema de Reconhecimento
- ✅ POST `/api/recognition` - Criar reconhecimento
- ✅ GET `/api/recognition/received/:userId` - Reconhecimentos recebidos
- ✅ GET `/api/recognition/public` - Reconhecimentos públicos

### Frontend - Interface Moderna

#### Páginas Implementadas
- ✅ **Login** - Autenticação de usuários
- ✅ **Dashboard** - Visão geral com métricas e gráficos
- ✅ **Minha Orquestra** - Gestão de colaboradores
- ✅ **Biblioteca de Rituais** - Práticas para a equipe
- ✅ **Questionário de Valorização** - 15 perguntas interativas

#### Componentes de Visualização
- ✅ **Radar de Energia** - Gráfico radar com 4 tipos de energia
- ✅ **Barômetro de Necessidades** - Gráfico de barras (Maslow)
- ✅ **Cards de Métricas** - KPIs do dashboard
- ✅ **Sugestões Inteligentes** - Recomendações personalizadas

#### Funcionalidades UI
- ✅ Autenticação e rotas protegidas
- ✅ State management (Zustand)
- ✅ Componentes shadcn/ui
- ✅ Design responsivo
- ✅ Tema moderno (Apple/Anthropic inspired)
- ✅ Exportação PDF (utilitário criado)

### Banco de Dados - Schema Completo

#### 12 Tabelas Prisma
- ✅ `User` - Usuários (Maestros e Colaboradores)
- ✅ `Team` - Equipes
- ✅ `TeamMember` - Membros das equipes
- ✅ `EnergyAssessment` - Avaliações de energia
- ✅ `NeedsAssessment` - Avaliações de necessidades
- ✅ `AppreciationLanguageProfile` - Perfis de valorização
- ✅ `Ritual` - Biblioteca de rituais
- ✅ `Feedback360` - Feedbacks 360°
- ✅ `DevelopmentTrack` - Trilhas de desenvolvimento
- ✅ `Recognition` - Sistema de reconhecimento
- ✅ `PerformanceRadar` - Radar de performance
- ✅ `WellbeingRadar` - Radar de bem-estar

## 🎯 Próximos Passos

1. **Explorar o Dashboard**
   - Faça login com as credenciais demo
   - Explore as visualizações de energia

2. **Testar API**
   - Use Postman/Insomnia
   - Endpoints disponíveis em http://localhost:3001/api

3. **Criar Dados**
   - Crie novas equipes
   - Adicione colaboradores
   - Registre avaliações

4. **Personalizar**
   - Ajuste cores e temas
   - Adicione novos rituais
   - Customize mensagens

## 📚 Documentação

- **README.md** - Visão geral completa
- **SETUP.md** - Guia detalhado de instalação
- **Este arquivo** - Quick start

## 🔑 Credenciais Demo

**Maestro (Líder):**
- Email: `maestro@orquestra.com`
- Senha: `maestro123`

**Colaborador:**
- Email: `joao@orquestra.com`
- Senha: `colab123`

## 🛠️ Tecnologias

**Backend:**
- Node.js 18+
- Express 4
- TypeScript 5
- Prisma ORM 5
- PostgreSQL 14+
- JWT + bcrypt
- Zod (validação)

**Frontend:**
- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- shadcn/ui
- Recharts
- Zustand
- Axios

## 💡 Dicas

- Use `npx prisma studio` para visualizar o banco de dados
- Logs do backend aparecem no console
- Erros de CORS? Verifique o `.env`
- Porta em uso? Altere no `.env` ou `vite.config.ts`

## 🐛 Troubleshooting Rápido

**Backend não inicia:**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

**Frontend não carrega:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Erro de banco:**
```bash
# Resetar banco (perde dados!)
cd backend
npx prisma migrate reset
npm run prisma:seed
```

---

**Pronto! Você agora tem a Orquestra de Potenciais rodando localmente!** 🎼
