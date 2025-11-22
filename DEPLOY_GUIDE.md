# 🚀 Guia de Deploy - Orquestra de Potenciais
## Para Iniciantes (Primeira vez com código)

Este guia vai te ensinar a colocar sua aplicação online, passo a passo, de forma **100% gratuita**.

---

## 📋 O que vamos fazer?

1. **Backend + Banco de Dados** → Render.com (gratuito)
2. **Frontend** → Vercel.com (gratuito)
3. **Conectar tudo** → Fazer frontend falar com backend

**Tempo estimado:** 30-40 minutos

---

## 🎯 Parte 1: Deploy do Backend no Render

### Passo 1.1: Criar conta no Render

1. Acesse: https://render.com
2. Clique em **"Get Started"** ou **"Sign Up"**
3. Escolha **"Sign up with GitHub"**
4. Autorize o Render a acessar seus repositórios

### Passo 1.2: Criar Banco de Dados PostgreSQL

1. No painel do Render, clique em **"New +"** (canto superior direito)
2. Selecione **"PostgreSQL"**
3. Preencha:
   - **Name:** `orquestra-database`
   - **Database:** `orquestra_potenciais`
   - **User:** `orquestra` (ou deixe o padrão)
   - **Region:** Escolha o mais próximo (ex: Ohio US East)
   - **PostgreSQL Version:** 14 ou 15
   - **Plan:** **Free** (importante!)
4. Clique em **"Create Database"**
5. **ESPERE** o banco ser criado (leva 2-3 minutos)
6. Quando pronto, você verá o status **"Available"**

### Passo 1.3: Copiar URL do Banco de Dados

1. Dentro da página do banco criado, procure por **"Connections"**
2. Você verá algo como **"Internal Database URL"** ou **"External Database URL"**
3. Clique em **"Copy"** ao lado de **"External Database URL"**
4. A URL será algo como:
   ```
   postgresql://orquestra:SENHA@dpg-xxxxx.oregon-postgres.render.com/orquestra_potenciais
   ```
5. **GUARDE ESTA URL** - você vai precisar dela!

### Passo 1.4: Preparar o Backend para Deploy

Precisamos criar alguns arquivos no backend. Vou criar para você:

**1. Arquivo `package.json` - Adicionar script de build:**

Já está pronto! ✅

**2. Criar arquivo `render.yaml`:**

Este arquivo diz ao Render como fazer o deploy.

### Passo 1.5: Fazer Deploy do Backend

1. No Render, clique em **"New +"** novamente
2. Selecione **"Web Service"**
3. Escolha **"Connect a repository"**
4. Procure por **"orquestra"** e clique em **"Connect"**
   - Se não aparecer, clique em "Configure account" e autorize o repositório

5. Preencha os campos:
   - **Name:** `orquestra-backend`
   - **Region:** Mesmo do banco de dados
   - **Branch:** `claude/orquestra-potenciais-saas-016KjB2ZHcJLXE3gGr5JqXJp`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`
   - **Plan:** **Free**

6. **Adicionar Variáveis de Ambiente:**

   Role para baixo até **"Environment Variables"**

   Clique em **"Add Environment Variable"** e adicione:

   ```
   DATABASE_URL = [COLE AQUI A URL DO BANCO QUE VOCÊ COPIOU]
   ```

   ```
   JWT_SECRET = orquestra-potenciais-production-secret-key-2024
   ```

   ```
   JWT_EXPIRES_IN = 7d
   ```

   ```
   NODE_ENV = production
   ```

   ```
   PORT = 3001
   ```

   ```
   CORS_ORIGIN = *
   ```

7. Clique em **"Create Web Service"**

8. **AGUARDE** o deploy (5-10 minutos na primeira vez)
   - Você verá logs aparecendo
   - Quando ver "Live" com um link verde, está pronto!

9. **Copie a URL do seu backend:**
   - Será algo como: `https://orquestra-backend.onrender.com`
   - **GUARDE ESTA URL!**

### Passo 1.6: Testar o Backend

1. Abra uma nova aba do navegador
2. Cole a URL do seu backend + `/api/health`
   - Exemplo: `https://orquestra-backend.onrender.com/api/health`
3. Você deve ver:
   ```json
   {
     "status": "ok",
     "message": "Orquestra de Potenciais API",
     "version": "1.0.0"
   }
   ```

✅ **Backend online!** Se viu isso, funcionou!

---

## 🎨 Parte 2: Deploy do Frontend no Vercel

### Passo 2.1: Criar conta na Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize a Vercel

### Passo 2.2: Fazer Deploy do Frontend

1. No painel da Vercel, clique em **"Add New..."** → **"Project"**
2. Procure por **"orquestra"** e clique em **"Import"**
3. Preencha:
   - **Project Name:** `orquestra-potenciais`
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (MUITO IMPORTANTE!)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Adicionar Variável de Ambiente:**

   Clique em **"Environment Variables"**

   Adicione:

   **Key:** `VITE_API_URL`

   **Value:** `https://orquestra-backend.onrender.com/api`

   (Use a URL do seu backend que você copiou, mas adicione `/api` no final)

5. Clique em **"Deploy"**

6. **AGUARDE** (2-3 minutos)
   - Você verá um foguete decolando 🚀
   - Quando terminar, clicará em "Congratulations!"

7. Clique em **"Visit"** ou copie a URL
   - Será algo como: `https://orquestra-potenciais.vercel.app`

---

## 🔗 Parte 3: Conectar Frontend e Backend

### Passo 3.1: Atualizar CORS no Backend

1. Volte para o **Render** (backend)
2. Vá em **"Environment"** no menu lateral
3. Encontre a variável `CORS_ORIGIN`
4. **Edite** e mude o valor para:
   ```
   https://orquestra-potenciais.vercel.app
   ```
   (use SUA URL da Vercel)

5. Clique em **"Save Changes"**
6. O Render vai fazer **redeploy automático** (2-3 minutos)

### Passo 3.2: Criar Dados de Demonstração

Precisamos popular o banco de dados com dados iniciais.

**Opção A: Usar Prisma Studio (Recomendado)**

1. No seu computador, no terminal:
   ```bash
   cd backend
   ```

2. Crie um arquivo `.env.production`:
   ```bash
   echo 'DATABASE_URL="[COLE AQUI A URL DO BANCO RENDER]"' > .env.production
   ```

3. Execute o seed:
   ```bash
   DATABASE_URL="[URL_DO_BANCO]" npx prisma db seed
   ```

**Opção B: Executar seed via Render (Mais fácil)**

1. No Render, vá no seu **Web Service** (backend)
2. Clique em **"Shell"** no menu lateral
3. Digite:
   ```bash
   npm run prisma:seed
   ```
4. Pressione Enter
5. Aguarde aparecer "Seed completed!"

---

## ✅ Parte 4: Testar Tudo

### Teste Final

1. Abra sua URL da Vercel: `https://orquestra-potenciais.vercel.app`
2. Você deve ver a tela de login
3. Use as credenciais de demonstração:
   - **Email:** `maestro@orquestra.com`
   - **Senha:** `maestro123`
4. Clique em **"Entrar"**
5. Se funcionou, você verá o Dashboard! 🎉

---

## 🎉 Pronto! Sua aplicação está online!

**URLs da sua aplicação:**

- **Frontend:** `https://orquestra-potenciais.vercel.app`
- **Backend API:** `https://orquestra-backend.onrender.com`
- **Banco de Dados:** PostgreSQL no Render

**Credenciais de acesso:**

- **Maestro:** maestro@orquestra.com / maestro123
- **Colaborador:** joao@orquestra.com / colab123

---

## 🔧 Comandos Úteis

### Fazer alterações depois

**Backend:**
1. Faça alterações no código local
2. Commit: `git add . && git commit -m "sua mensagem"`
3. Push: `git push`
4. Render faz redeploy automático!

**Frontend:**
1. Faça alterações no código local
2. Commit: `git add . && git commit -m "sua mensagem"`
3. Push: `git push`
4. Vercel faz redeploy automático!

### Ver logs (se algo der errado)

**Render:**
- Clique no seu serviço → "Logs" (menu lateral)

**Vercel:**
- Vá em "Deployments" → Clique no deployment → "View Function Logs"

---

## 🐛 Problemas Comuns

### 1. "Cannot connect to database"

**Solução:**
- Verifique se a `DATABASE_URL` está correta no Render
- Certifique-se que o banco de dados está "Available"
- Tente fazer redeploy do backend

### 2. "API not responding" no frontend

**Solução:**
- Verifique se `VITE_API_URL` está correta na Vercel
- Abra a URL do backend no navegador (deve mostrar "running")
- Verifique se `CORS_ORIGIN` no Render está com a URL da Vercel

### 3. Login não funciona

**Solução:**
- Verifique se o seed foi executado com sucesso
- Tente criar um novo usuário via API (Postman/Insomnia)
- Veja os logs do backend no Render

### 4. "Application error" no Render

**Solução:**
- Veja os logs (menu "Logs")
- Verifique se todas as variáveis de ambiente estão corretas
- Tente fazer redeploy manual (botão "Manual Deploy")

### 5. Frontend carrega mas fica em branco

**Solução:**
- Abra o Console do navegador (F12)
- Veja se tem erros de CORS
- Verifique se `VITE_API_URL` termina com `/api`
- Certifique-se que o backend está respondendo

---

## 📞 Precisa de Ajuda?

Se algo não funcionar:

1. **Veja os logs:**
   - Render: Menu "Logs"
   - Vercel: "Deployments" → Seu deploy → "View Logs"
   - Navegador: F12 → Console

2. **Verifique as variáveis:**
   - Render: Menu "Environment"
   - Vercel: Settings → Environment Variables

3. **Tente novamente:**
   - Às vezes só fazer redeploy resolve
   - Render: Botão "Manual Deploy"
   - Vercel: "Deployments" → Redeploy

---

## 🎓 O que você aprendeu

Parabéns! Você agora sabe:

✅ Fazer deploy de um backend Node.js
✅ Configurar um banco de dados PostgreSQL na nuvem
✅ Fazer deploy de um frontend React
✅ Conectar frontend e backend
✅ Configurar variáveis de ambiente
✅ Executar migrations de banco de dados
✅ Ver logs e debugar problemas

---

## 🚀 Próximos Passos

1. **Compartilhe sua URL** com amigos/colegas!
2. **Personalize** cores, textos, etc.
3. **Adicione features** novas
4. **Configure domínio próprio** (opcional):
   - Vercel permite adicionar domínio customizado gratuitamente
   - Exemplo: `orquestra.seusite.com`

---

**Sua aplicação está no ar e pronta para uso!** 🎼

Qualquer dúvida, volte aqui e siga o guia passo a passo novamente.
