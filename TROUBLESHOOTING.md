# 🔧 Guia de Solução de Problemas - Orquestra de Potenciais

## Para Iniciantes - Resolvendo problemas comuns

Este guia te ajuda a resolver os problemas mais comuns que você pode encontrar.

---

## 🚨 Problema: Backend não inicia localmente

### Sintoma
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

### Causa
PostgreSQL não está rodando ou não consegue conectar.

### Solução

**Windows:**
1. Abra o "Services" (Serviços)
2. Procure por "PostgreSQL"
3. Clique com botão direito → "Start" (Iniciar)

**Mac:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

**Verificar se está rodando:**
```bash
psql -U postgres
# Se conectar, está funcionando!
# Para sair: \q
```

---

## 🚨 Problema: Erro ao executar migrations

### Sintoma
```
Error: P1001: Can't reach database server
```

### Solução

1. **Verifique a DATABASE_URL no arquivo .env:**
   ```bash
   cd backend
   cat .env
   ```

2. **Formato correto:**
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/orquestra_potenciais"
   ```

3. **Teste a conexão:**
   ```bash
   psql -U postgres -d orquestra_potenciais
   ```

4. **Se o banco não existe, crie:**
   ```bash
   psql -U postgres
   CREATE DATABASE orquestra_potenciais;
   \q
   ```

5. **Execute as migrations novamente:**
   ```bash
   npx prisma migrate dev
   ```

---

## 🚨 Problema: Frontend não carrega

### Sintoma
Página em branco ou erro 404

### Solução

1. **Verifique se o servidor está rodando:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Se der erro de dependências:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **Verifique a porta:**
   - Deve estar em `http://localhost:5173`
   - Se estiver diferente, veja no terminal a porta correta

4. **Limpe o cache do navegador:**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

---

## 🚨 Problema: Login não funciona

### Sintoma
"Email ou senha inválidos" mesmo usando credenciais corretas

### Solução

1. **Verifique se o seed foi executado:**
   ```bash
   cd backend
   npm run prisma:seed
   ```

2. **Se der erro no seed, reset o banco:**
   ```bash
   npx prisma migrate reset
   # Digite 'y' para confirmar
   npm run prisma:seed
   ```

3. **Verifique se o backend está respondendo:**
   - Abra: `http://localhost:3001/api/health`
   - Deve mostrar: `{"status":"ok",...}`

4. **Verifique o console do navegador (F12):**
   - Veja se tem erros de CORS ou rede
   - Se tiver erro de CORS, verifique o `.env` do backend

---

## 🚨 Problema: Erro de CORS no navegador

### Sintoma
```
Access to XMLHttpRequest has been blocked by CORS policy
```

### Solução

1. **Verifique o arquivo backend/.env:**
   ```
   CORS_ORIGIN=http://localhost:5173
   ```

2. **Reinicie o backend:**
   ```bash
   # Pare o servidor (Ctrl+C)
   npm run dev
   ```

3. **Se estiver em produção, atualize para a URL da Vercel:**
   ```
   CORS_ORIGIN=https://sua-app.vercel.app
   ```

---

## 🚨 Problema: Deploy falhou no Render

### Sintoma
Deploy com status "Failed" ou "Error"

### Solução

1. **Veja os logs:**
   - No Render, clique no seu serviço
   - Menu lateral → "Logs"
   - Procure por linhas em vermelho (erros)

2. **Problemas comuns:**

   **a) Erro de build:**
   ```
   Build Command: npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```

   **b) Erro de DATABASE_URL:**
   - Vá em "Environment" no Render
   - Verifique se DATABASE_URL está correta
   - Deve começar com `postgresql://`

   **c) Erro de porta:**
   - Adicione variável `PORT` com valor `3001`

3. **Force redeploy:**
   - Botão "Manual Deploy" → "Deploy latest commit"

---

## 🚨 Problema: Deploy falhou na Vercel

### Sintoma
"Build Failed" ou erro 500

### Solução

1. **Verifique o Root Directory:**
   - Settings → General → Root Directory
   - Deve ser: `frontend`

2. **Verifique as variáveis de ambiente:**
   - Settings → Environment Variables
   - `VITE_API_URL` deve terminar com `/api`
   - Exemplo: `https://orquestra-backend.onrender.com/api`

3. **Rebuild:**
   - Deployments → Seu deploy → "..." → "Redeploy"

4. **Veja os logs:**
   - Deployments → Clique no deploy → "View Function Logs"

---

## 🚨 Problema: Banco de dados não conecta em produção

### Sintoma
Backend online mas não consegue acessar dados

### Solução

1. **No Render, verifique o banco:**
   - Dashboard → Seu PostgreSQL
   - Status deve ser "Available"

2. **Copie a URL externa do banco:**
   - "External Database URL"
   - Cole em "Environment" do backend

3. **Execute as migrations:**
   - No backend (Render), vá em "Shell"
   - Digite:
     ```bash
     npx prisma migrate deploy
     ```

4. **Execute o seed:**
   ```bash
   npm run prisma:seed
   ```

---

## 🚨 Problema: Páginas dão erro 404 em produção (Vercel)

### Sintoma
Rota `/dashboard` funciona localmente mas dá 404 em produção

### Solução

O arquivo `vercel.json` já está configurado corretamente! ✅

Se ainda der erro:

1. **Verifique se o arquivo existe:**
   ```bash
   cat vercel.json
   ```

2. **Deve ter este conteúdo:**
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. **Faça commit e push:**
   ```bash
   git add vercel.json
   git commit -m "fix: Add vercel routing config"
   git push
   ```

---

## 🚨 Problema: Variáveis de ambiente não funcionam

### Sintoma
Aplicação não consegue ler as variáveis

### Solução - Backend (Render)

1. Vá em "Environment"
2. Adicione as variáveis:
   ```
   DATABASE_URL = (URL do seu banco)
   JWT_SECRET = algum-segredo-super-secreto
   NODE_ENV = production
   PORT = 3001
   CORS_ORIGIN = (URL do seu frontend Vercel)
   ```
3. Salve e aguarde redeploy automático

### Solução - Frontend (Vercel)

1. Settings → Environment Variables
2. Adicione:
   ```
   VITE_API_URL = https://seu-backend.onrender.com/api
   ```
3. **IMPORTANTE:** Variáveis devem começar com `VITE_`
4. Redeploy após adicionar

---

## 🚨 Problema: "Cannot find module" no deploy

### Sintoma
```
Error: Cannot find module '@prisma/client'
```

### Solução

1. **Verifique o Build Command no Render:**
   ```
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```

2. **Adicione no package.json:**
   ```json
   "scripts": {
     "postinstall": "prisma generate"
   }
   ```

3. **Force redeploy**

---

## 🚨 Problema: Aplicação muito lenta em produção

### Sintoma
Backend demora muito para responder na primeira requisição

### Causa
Render Free Tier desliga o servidor após 15 minutos de inatividade.

### Solução

**Opção 1: Aceitar o delay (grátis)**
- Primeiro acesso pode demorar 30-60 segundos
- Após "acordar", fica rápido
- É normal no plano gratuito

**Opção 2: Upgrade para plano pago (US$7/mês)**
- Servidor fica sempre ativo
- Sem delay no primeiro acesso

**Opção 3: Ping automático (gambiarra)**
- Usar serviço como UptimeRobot para fazer ping a cada 14 minutos
- Mantém servidor acordado
- Contra os termos de uso do Render

---

## 🚨 Problema: TypeScript errors no build

### Sintoma
```
error TS2307: Cannot find module '@/components/...'
```

### Solução

1. **Verifique o tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Se for no backend, adicione no tsconfig:**
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "node"
     }
   }
   ```

---

## 📞 Ainda com problemas?

### Checklist de debug

- [ ] PostgreSQL está rodando?
- [ ] .env existe e está configurado?
- [ ] DATABASE_URL está correta?
- [ ] node_modules instalado? (npm install)
- [ ] Migrations executadas? (npx prisma migrate dev)
- [ ] Seed executado? (npm run prisma:seed)
- [ ] Backend responde em /api/health?
- [ ] Frontend aponta para backend correto?
- [ ] CORS configurado corretamente?
- [ ] Navegador sem erros no Console (F12)?

### Como pedir ajuda

Quando pedir ajuda, envie:

1. **Mensagem de erro completa**
   ```bash
   # Copie todo o erro, não só a última linha
   ```

2. **O que você estava tentando fazer**

3. **Logs relevantes:**
   - Backend: Terminal onde está rodando
   - Frontend: F12 → Console
   - Render: Menu "Logs"
   - Vercel: Deployment → Logs

4. **Ambiente:**
   - Sistema operacional
   - Versão do Node (node --version)
   - Local ou produção?

---

## 🎓 Dicas de Debug

### 1. Console do navegador é seu amigo
- Sempre abra com F12
- Veja a aba "Console" para erros
- Veja a aba "Network" para requisições

### 2. Leia os logs
- Erros geralmente são claros
- Google a mensagem de erro exata
- Stack Overflow é seu amigo

### 3. Teste passo a passo
- Funciona localmente?
- Funciona o backend sozinho?
- Funciona o frontend sozinho?
- Funcionam juntos localmente?
- Problema só em produção?

### 4. Quando em dúvida, reinicie
- Reinicie o servidor
- Reinicie o banco
- Limpe node_modules e reinstale
- Faça redeploy

---

**Lembre-se: Todo desenvolvedor enfrenta erros. Faz parte do processo!** 🚀

A cada erro resolvido, você aprende algo novo.
