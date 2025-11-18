# 🎼 Orquestra de Potenciais

Uma plataforma SaaS moderna para avaliação e desenvolvimento de performance organizacional, baseada em neuropsicologia aplicada e gestão da energia coletiva.

## 🎯 Visão Geral

A **Orquestra de Potenciais** transcende os modelos tradicionais de gestão de desempenho, oferecendo um acompanhamento contínuo e dinâmico focado em dimensões humanas e neuropsicológicas cruciais para a performance sustentável e o engajamento dos colaboradores.

## ✨ Funcionalidades Principais

### 🎭 Para Maestros (Líderes)

- **Dashboard Inteligente**: Visão 360° da energia e bem-estar da equipe
- **Radar de Energia**: Análise de 4 tipos de energia coletiva (Produtiva, Confortável, Renovação, Conexão)
- **Barômetro de Necessidades**: Mapeamento baseado na Pirâmide de Maslow adaptada
- **Gestão de Equipes**: Cadastro e gerenciamento de múltiplas equipes
- **Biblioteca de Rituais**: Sugestões personalizadas de ações e práticas
- **Relatórios em PDF**: Exportação de análises detalhadas

### 👥 Para Colaboradores

- **Perfil Personalizado**: Questionário de Linguagens de Valorização
- **Autoavaliação**: Reflexões sobre necessidades e energia
- **Trilhas de Desenvolvimento**: Acompanhamento de crescimento pessoal
- **Feedback 360°**: Sistema dinâmico de feedback contínuo

## 🏗️ Arquitetura

### Frontend
- ⚛️ React 18 + TypeScript
- ⚡ Vite (build tool)
- 🎨 Tailwind CSS + shadcn/ui
- 📊 Recharts (visualizações)
- 🔄 React Router
- 🗂️ Zustand (state management)

### Backend
- 🟢 Node.js + Express + TypeScript
- 🐘 PostgreSQL
- 🔷 Prisma ORM
- 🔐 JWT Authentication
- 📄 jsPDF (geração de PDFs)

## 📦 Estrutura do Projeto

```
orquestra/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # Comunicação com API
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Funções utilitárias
│   │   └── lib/           # Bibliotecas e configs
│   └── package.json
├── backend/           # API Node.js
│   ├── src/
│   │   ├── controllers/   # Lógica de controle
│   │   ├── routes/        # Definição de rotas
│   │   ├── middleware/    # Middlewares
│   │   ├── services/      # Lógica de negócio
│   │   └── utils/         # Utilitários
│   ├── prisma/            # Schema e migrations
│   └── package.json
└── shared/            # Tipos compartilhados
    └── types/

```

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [repository-url]
cd orquestra

# Instale as dependências do backend
cd backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Execute as migrations do banco
npx prisma migrate dev

# Inicie o servidor backend
npm run dev

# Em outro terminal, instale e inicie o frontend
cd ../frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🎨 Design System

Inspirado nos princípios de design da Apple e Anthropic:

- ✨ Minimalista e clean
- 🎯 Foco na clareza e usabilidade
- 🌊 Animações sutis e fluidas
- 🎨 Paleta de cores profissional
- 📱 Totalmente responsivo

## 📚 Módulos

1. **Autenticação e Perfis**
2. **Dashboard do Maestro**
3. **Radar de Bem-Estar Cognitivo e Emocional**
4. **Radar de Desempenho e Potencial**
5. **Barômetro de Necessidades**
6. **Pulso da Equipe**
7. **Minha Orquestra**
8. **Linguagens de Valorização**
9. **Biblioteca de Rituais**
10. **Feedback 360° Dinâmico**
11. **Trilhas de Desenvolvimento**
12. **Sistema de Reconhecimento**
13. **Relatórios e Analytics**

## 🔒 Segurança

- 🔐 Autenticação JWT
- 🔑 Senhas com hash bcrypt
- 🛡️ Proteção contra CSRF
- 🚦 Rate limiting
- ✅ Validação de dados

## 📄 Licença

Proprietary - Todos os direitos reservados

## 👥 Autores

Desenvolvido para revolucionar a gestão de equipes com base em neuropsicologia e inteligência organizacional.

---

**Orquestra de Potenciais** - Transformando equipes em sinfonias de alto desempenho 🎼
