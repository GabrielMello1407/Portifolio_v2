# Portfólio — Gabriel Mello

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

Portfólio pessoal de **Gabriel Mello** — Software Engineer (AI Integration · Full-Stack).
Site de página única, bilíngue (pt-BR / en), com animações modernas, um chat de IA sobre o próprio perfil e detalhes interativos.

🔗 **Produção:** [gabriel-mello.com](https://gabriel-mello.com)

---

## ✨ Destaques

- **Design autoral** — paleta teal/esmeralda sobre base near-black, tipografia display + mono, layout em bento e numeração editorial das seções.
- **i18n pt-BR / en** — dicionário tipado + seletor de idioma; detecção pelo navegador e persistência no `localStorage`. Dois currículos (PDF) por idioma.
- **Animações premium** — `framer-motion` para micro-interações, **GSAP + Lenis** para scroll suave e parallax, entrada do hero em CSS (LCP rápido), cursor spotlight, marquee de tecnologias e tilt 3D nos cards.
- **Projetos como case study** — grade filtrável com modais (visão geral, destaques técnicos, **diagramas de arquitetura**, galeria com lightbox), links ao vivo e logos.
- **Chat "Pergunte à minha IA"** — widget com LLM (Groq) + base de conhecimento sobre o Gabriel (RAG-lite), **blindado** contra abuso: rate limit por IP, checagem de origem, sanitização anti prompt-injection, timeout e system prompt protegido.
- **Atividade do GitHub ao vivo** — heatmap de contribuições + stats, via rota cacheada (`/api/github`).
- **Terminal interativo** — abre com `/` ou `⌘K` (e por um botão na navbar). Não é só um menu: é um **shell de mentira com filesystem** — `ls`, `cd`, `cat`, `pwd`, `tree`, `mkdir`/`touch`/`rm` (na sua sessão), busca com `grep`/`find` e **pipes** (`cat skills.txt | grep IA`), **autocomplete por `Tab`** e `man <comando>`. As entradas do `ls`/`tree` são clicáveis; os projetos viram arquivos navegáveis e há uma pasta escondida pra achar.
- **Caça aos segredos** — easter eggs rastreados num medidor (Konami, "gm", troca de aba, terminal, `sudo` e o explorador do filesystem).
- **SEO** — metadata + Open Graph dinâmico (`/opengraph-image`), JSON-LD (schema Person), `robots.txt` e `sitemap.xml`.
- **Acessível** — foco de teclado visível, `aria` em controles, `prefers-reduced-motion` respeitado, `sr-only` onde necessário.

---

## 🧱 Stack

| Camada | Tecnologias |
| --- | --- |
| **Core** | Next.js 16 (App Router) · React 19 · TypeScript (strict) |
| **UI / Estilo** | Tailwind CSS v4 (CSS-first) · lucide-react |
| **Animação** | framer-motion · GSAP + ScrollTrigger · Lenis |
| **Back-end (routes)** | API Routes do Next · Groq (chat) · Resend (e-mail) · GitHub API |
| **Infra** | PM2 · Nginx · Cloudflare · on-premise (VPS) |

---

## 📁 Estrutura

```text
src/
├── app/
│   ├── api/                # rotas: chat (IA), github (atividade), send (contato)
│   ├── layout.tsx          # fontes, metadata, JSON-LD
│   ├── page.tsx            # composição da página
│   ├── opengraph-image.tsx # OG image dinâmica
│   ├── robots.ts · sitemap.ts
│   └── globals.css         # design tokens (Tailwind v4 @theme) + utilitários
├── components/
│   ├── *.tsx               # seções (Hero, FeaturedProject, Projects, About, Contact…)
│   ├── effects/            # Terminal, AiChat, SmoothScroll, CursorGlow, EasterEgg…
│   └── ui/                 # primitivas (Reveal, SectionHeading, Counter, Logo…)
├── data/                   # projects.ts (conteúdo dos projetos) · site.ts
├── i18n/                   # dictionary.ts (strings pt/en) · LanguageContext.tsx
├── lib/                    # utils · rate-limit · secrets · profile-context (RAG)
└── types.ts                # tipos compartilhados
```

---

## 🚀 Como rodar (desenvolvimento)

Pré-requisitos: **Node.js 20+**.

```bash
git clone https://github.com/GabrielMello1407/Portifolio_v2.git
cd Portifolio_v2
npm install
cp .env.example .env        # preencha as chaves (veja abaixo)
npm run dev                 # http://localhost:3000
```

> O site funciona sem nenhuma variável de ambiente — o formulário de contato e o chat de IA apenas exibem um fallback amigável até as chaves serem configuradas.

---

## 🔑 Variáveis de ambiente

Copie `.env.example` para `.env`. Todas são opcionais (degradação graciosa):

| Variável | Uso |
| --- | --- |
| `PORT` | Porta da aplicação (produção). Padrão: `3002`. |
| `RESEND_API_KEY` | Formulário de contato (`/api/send`) via [Resend](https://resend.com). |
| `FROM_EMAIL` | Remetente dos e-mails (use um domínio verificado em produção). |
| `GROQ_API_KEY` | Chat "Pergunte à minha IA" (`/api/chat`) via [Groq](https://console.groq.com/keys). |
| `CHAT_MODEL` | Modelo do Groq (padrão `llama-3.3-70b-versatile`). |
| `ALLOWED_ORIGINS` | Origens extras permitidas no `/api/chat` (o domínio e localhost já são aceitos). |
| `GITHUB_TOKEN` | Opcional — aumenta o limite da API do GitHub (`/api/github`). |

> O e-mail de **destino** do contato é fixo no código (`src/app/api/send/route.ts`).

---

## 📜 Scripts

```bash
npm run dev          # servidor de desenvolvimento (porta 3000)
npm run build        # build de produção
npm run start        # next start na porta 3002
npm run lint         # ESLint
npm run pm2          # pm2 start ecosystem.config.js
npm run pm2:reload   # pm2 reload portfolio
```

---

## 🌐 Deploy (VPS · PM2 + Nginx + Cloudflare)

A app sobe na porta **3002** (3000 e 3001 ficam para outros serviços).

```bash
git clone <repo> && cd Portifolio_v2
cp .env.example .env         # preencha RESEND_API_KEY / GROQ_API_KEY
npm ci
npm run build
pm2 start ecosystem.config.js
pm2 save                     # persiste entre reboots
pm2 startup                  # (uma vez) serviço de boot
```

Atualizar após um `git pull`:

```bash
npm ci && npm run build && pm2 reload portfolio
```

Aponte o reverse proxy (**Nginx** ou **Cloudflare Tunnel**) para `http://127.0.0.1:3002` no domínio `gabriel-mello.com` (TLS via Cloudflare/certbot).

> Para um Lighthouse limpo, desligue o **Email Address Obfuscation** no Cloudflare (Scrape Shield) — ele injeta um script extra por causa do e-mail na página.

---

## 🥚 Easter eggs

- **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) — chuva de confete.
- Digite **`gm`** em qualquer lugar (fora de campos de texto).
- **Troque de aba** e veja o título mudar.
- Abra o **terminal** (`/` ou `⌘K`) e tente `sudo hire-me`.
- **Explore o terminal como um Unix** — `ls -a` revela uma pasta escondida; `cat` no arquivo certo conta um segredo.
- Cada segredo encontrado aparece no medidor (canto inferior-esquerdo). Encontre os 6 🏆
- E tem uma mensagem escondida no **console** do navegador.

---

## 🧩 Conteúdo & i18n

- Todo o texto da interface fica em `src/i18n/dictionary.ts` (objetos `pt` e `en`).
- O conteúdo dos projetos fica em `src/data/projects.ts` (campos bilíngues `{ pt, en }`).
- Capturas de tela dos projetos vão em `public/projects/<id>/` (veja o README de lá).

---

## 👤 Autor

**Gabriel Mello** — Software Engineer
[gabriel-mello.com](https://gabriel-mello.com) · [GitHub](https://github.com/GabrielMello1407) · [LinkedIn](https://www.linkedin.com/in/gabrielmellomoraes/)
