# 🎼 Guia de Instalação - Orquestra de Potenciais

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **npm** ou **yarn** (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🚀 Instalação Rápida

### 1. Clone o Repositório

```bash
git clone [your-repository-url]
cd orquestra
```

### 2. Configure o Banco de Dados PostgreSQL

Crie um banco de dados PostgreSQL:

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE orquestra_potenciais;

# Crie um usuário (opcional)
CREATE USER orquestra_user WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE orquestra_potenciais TO orquestra_user;
```

### 3. Configure o Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env com suas configurações
# Especialmente a DATABASE_URL:
# DATABASE_URL="postgresql://orquestra_user:sua_senha_aqui@localhost:5432/orquestra_potenciais?schema=public"
```

**Edite o arquivo `.env` com suas configurações:**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/orquestra_potenciais?schema=public"
PORT=3001
NODE_ENV=development
JWT_SECRET=seu-segredo-jwt-super-secreto-aqui
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 4. Execute as Migrations do Banco de Dados

```bash
# Ainda no diretório backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed do Banco de Dados (Opcional - Dados de Demonstração)

```bash
npm run prisma:seed
```

**Credenciais de demonstração:**
- **Maestro:** `maestro@orquestra.com` / `maestro123`
- **Colaborador:** `joao@orquestra.com` / `colab123`

### 6. Inicie o Backend

```bash
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 7. Configure o Frontend

Em outro terminal:

```bash
cd ../frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

**O arquivo `.env` do frontend deve conter:**

```env
VITE_API_URL=http://localhost:3001/api
```

### 8. Inicie o Frontend

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## ✅ Verificação da Instalação

1. Abra seu navegador em `http://localhost:5173`
2. Você deve ver a tela de login
3. Use as credenciais de demonstração:
   - Email: `maestro@orquestra.com`
   - Senha: `maestro123`
4. Você deve ser redirecionado para o Dashboard

## 🔧 Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Prisma Studio (interface gráfica do banco)
npm run prisma:studio

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Reset do banco de dados (CUIDADO!)
npx prisma migrate reset
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint
npm run lint
```

## 🐛 Troubleshooting

### Erro de Conexão com o Banco de Dados

Se você receber erro de conexão com PostgreSQL:

1. Verifique se o PostgreSQL está rodando
2. Confirme que a `DATABASE_URL` no `.env` está correta
3. Teste a conexão:

```bash
psql -U postgres -d orquestra_potenciais
```

### Porta já em uso

Se a porta 3001 ou 5173 já estiver em uso:

1. **Backend:** Altere `PORT` no arquivo `.env`
2. **Frontend:** Altere a porta no `vite.config.ts`

### Erro com Prisma

Se tiver problemas com o Prisma:

```bash
cd backend
npx prisma generate
npx prisma migrate reset
npm run prisma:seed
```

## 📦 Estrutura do Projeto

```
orquestra/
├── backend/              # API Node.js + Express + Prisma
│   ├── src/
│   │   ├── controllers/  # Lógica de negócio
│   │   ├── routes/       # Rotas da API
│   │   ├── middleware/   # Middlewares
│   │   ├── utils/        # Utilitários
│   │   └── index.ts      # Entry point
│   ├── prisma/
│   │   ├── schema.prisma # Schema do banco
│   │   └── seed.ts       # Dados iniciais
│   └── package.json
│
├── frontend/             # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utilitários
│   └── package.json
│
└── README.md
```

## 🌐 Deploy

### Backend (Heroku, Railway, Render)

1. Configure as variáveis de ambiente no serviço escolhido
2. Configure o PostgreSQL (ou use add-on)
3. Execute as migrations:

```bash
npx prisma migrate deploy
```

### Frontend (Vercel, Netlify)

1. Configure a variável `VITE_API_URL` para apontar para o backend em produção
2. Build e deploy automático

## 📚 Documentação da API

Após iniciar o backend, acesse:

- Health Check: `http://localhost:3001/api/health`
- Endpoints disponíveis estão documentados em cada arquivo de rotas

## 💡 Próximos Passos

1. Explore o Dashboard
2. Crie sua primeira equipe
3. Adicione colaboradores
4. Registre avaliações de energia
5. Explore a biblioteca de rituais
6. Configure linguagens de valorização

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do terminal
2. Consulte este guia de instalação
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para transformar equipes em sinfonias de alto desempenho** 🎼
