# 🚀 Deploy SUPER SIMPLES - Para Quem Nunca Mexeu com Código

## ⏱️ Tempo: 20 minutos

## 📝 Checklist Rápido

Vou te guiar passo a passo. Marque cada item conforme for fazendo:

---

## PARTE 1️⃣: Backend (Servidor + Banco de Dados)

### ✅ Passo 1: Criar conta no Render
- [ ] Acesse: https://render.com
- [ ] Clique em "Sign Up with GitHub"
- [ ] Autorize o Render

### ✅ Passo 2: Criar Banco de Dados
- [ ] No Render, clique "New +" → "PostgreSQL"
- [ ] Nome: `orquestra-database`
- [ ] Plan: **Free** (importante!)
- [ ] Clique "Create Database"
- [ ] **ESPERE 2-3 minutos** até ficar "Available"
- [ ] Copie a "External Database URL" (botão Copy)
- [ ] Cole em um bloco de notas (vai usar depois)

### ✅ Passo 3: Criar Backend
- [ ] Clique "New +" → "Web Service"
- [ ] "Connect a repository" → Escolha "orquestra"
- [ ] Preencha:
  - Name: `orquestra-backend`
  - Branch: `claude/orquestra-potenciais-saas-016KjB2ZHcJLXE3gGr5JqXJp`
  - Root Directory: `backend`
  - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
  - Start Command: `npm start`
  - Plan: **Free**

### ✅ Passo 4: Adicionar Variáveis de Ambiente
Role para baixo até "Environment Variables" e adicione **uma por uma**:

- [ ] `DATABASE_URL` = [Cole aqui a URL do banco que você copiou]
- [ ] `JWT_SECRET` = `orquestra-secret-2024`
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3001`
- [ ] `CORS_ORIGIN` = `*`

- [ ] Clique "Create Web Service"
- [ ] **ESPERE 5-10 minutos** (vai aparecer "Live" quando pronto)
- [ ] Copie a URL do backend (ex: `https://orquestra-backend.onrender.com`)
- [ ] Cole no bloco de notas

### ✅ Passo 5: Testar Backend
- [ ] Abra no navegador: `[SUA_URL_BACKEND]/api/health`
- [ ] Deve mostrar algo como: `{"status":"ok",...}`
- [ ] ✅ Se viu isso, funcionou!

### ✅ Passo 6: Criar Dados de Demonstração
- [ ] No Render, no seu backend, clique "Shell" (menu lateral)
- [ ] Digite: `npm run prisma:seed`
- [ ] Pressione Enter
- [ ] Aguarde aparecer "✅ Seed completed!"

---

## PARTE 2️⃣: Frontend (Interface)

### ✅ Passo 1: Criar conta na Vercel
- [ ] Acesse: https://vercel.com
- [ ] "Continue with GitHub"
- [ ] Autorize a Vercel

### ✅ Passo 2: Fazer Deploy
- [ ] Clique "Add New..." → "Project"
- [ ] Encontre "orquestra" e clique "Import"
- [ ] Preencha:
  - Project Name: `orquestra-potenciais`
  - Framework: Vite
  - Root Directory: `frontend` (IMPORTANTE!)
  - Build Command: `npm run build`
  - Output Directory: `dist`

### ✅ Passo 3: Adicionar URL do Backend
- [ ] Em "Environment Variables"
- [ ] Key: `VITE_API_URL`
- [ ] Value: `[SUA_URL_BACKEND]/api` (adicione `/api` no final!)
  - Exemplo: `https://orquestra-backend.onrender.com/api`
- [ ] Clique "Deploy"
- [ ] **ESPERE 2-3 minutos**
- [ ] Copie a URL (ex: `https://orquestra-potenciais.vercel.app`)

---

## PARTE 3️⃣: Conectar Tudo

### ✅ Passo 1: Atualizar CORS
- [ ] Volte para o Render (backend)
- [ ] Clique em "Environment" (menu lateral)
- [ ] Edite a variável `CORS_ORIGIN`
- [ ] Mude de `*` para a URL da Vercel (ex: `https://orquestra-potenciais.vercel.app`)
- [ ] Clique "Save Changes"
- [ ] **ESPERE** o redeploy (2-3 min)

---

## 🎉 PRONTO! TESTE AGORA

### ✅ Teste Final
- [ ] Abra a URL da Vercel no navegador
- [ ] Deve aparecer a tela de login
- [ ] Faça login com:
  - Email: `maestro@orquestra.com`
  - Senha: `maestro123`
- [ ] Clique "Entrar"
- [ ] ✅ Se aparecer o Dashboard, **FUNCIONOU!** 🎉

---

## 📝 Suas URLs (anote aqui!)

**Frontend:** https://_________________________.vercel.app

**Backend:** https://_________________________.onrender.com

**Banco:** (está dentro do Render, não precisa acessar)

---

## ❌ Deu Erro?

### Frontend não abre?
1. Espere 2 minutos (às vezes demora)
2. Limpe o cache: Ctrl+Shift+R

### Login não funciona?
1. Verifique se executou o seed (Passo 6 do Backend)
2. Se não, vá no Render → Backend → Shell → `npm run prisma:seed`

### Erro "Cannot connect"?
1. Verifique se a `VITE_API_URL` termina com `/api`
2. Verifique se o backend está "Live" no Render
3. Veja o arquivo TROUBLESHOOTING.md

### Erro de CORS?
1. Verifique se `CORS_ORIGIN` no Render tem a URL da Vercel
2. Sem http://, só https://
3. Sem barra / no final

---

## 💡 Dicas

- **Primeira vez acessando:** Pode demorar 30s (Render acorda o servidor)
- **Mudou código?** Só fazer push pro GitHub, deploy é automático!
- **Esqueceu senha?** Use: maestro@orquestra.com / maestro123
- **Quer domínio próprio?** Vercel permite adicionar de graça!

---

## 🎓 O que você acabou de fazer?

Parabéns! Você acabou de:

✅ Colocar um banco de dados PostgreSQL online
✅ Fazer deploy de um backend Node.js
✅ Fazer deploy de um frontend React
✅ Conectar tudo e deixar funcionando
✅ Criar sua primeira aplicação web completa! 🎉

**Isso é MUITO para uma primeira vez! Você está incrível!** 🌟

---

## 📱 Compartilhe!

Sua aplicação está online! Compartilhe a URL com:
- Amigos
- Colegas de trabalho
- Portfolio
- LinkedIn

**URL:** https://_________________________.vercel.app

---

**Qualquer dúvida, olhe o arquivo TROUBLESHOOTING.md ou DEPLOY_GUIDE.md**
