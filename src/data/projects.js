/**
 * Conteúdo bilíngue baseado no currículo + descrições técnicas reais.
 * Campos traduzíveis usam { pt, en } e são resolvidos via tx().
 *
 * 📸 SCREENSHOTS: coloque as imagens em public/projects/<id>/ e liste em `images`.
 *    Ex.: images: ['/projects/etp/1.png', '/projects/etp/2.png']
 *    (deixe [] enquanto não houver prints — a galeria some sozinha.)
 */

export const featured = {
  name: 'FlunexApp',
  logo: '/brand/flunex_icon.png',
  wordmark: '/brand/flunex_horizontal.png',
  liveUrl: 'https://www.flunexapp.com',
  tagline: {
    pt: 'SaaS multi-tenant para automação de WhatsApp',
    en: 'Multi-tenant SaaS for WhatsApp automation',
  },
  year: { pt: '2025 — Presente', en: '2025 — Present' },
  role: { pt: 'Founder & Lead Engineer · Em produção', en: 'Founder & Lead Engineer · In production' },
  summary: {
    pt: 'SaaS multi-tenant arquitetado e construído do zero. Editor visual de fluxos conversacionais com geração automática via IA usando múltiplos provedores de LLM (Gemini, Claude, Groq). Assinaturas recorrentes com prorata e créditos, multi-tenancy estrito, multi-workspace com RBAC, internacionalização completa pt-BR/en e um sistema completo de anti-abuso e proteção de dados rodando em produção.',
    en: 'A multi-tenant SaaS architected and built from scratch. Visual conversational flow editor with AI-powered generation using multiple LLM providers (Gemini, Claude, Groq). Recurring subscriptions with proration and credits, strict multi-tenancy, multi-workspace RBAC, full pt-BR/en internationalization and a complete anti-abuse and data-protection system running in production.',
  },
  highlights: [
    {
      title: { pt: 'Geração de fluxos por IA', en: 'AI-powered flow generation' },
      text: {
        pt: 'Orquestrada entre múltiplos provedores de LLM (Gemini, Claude, Groq) com validação de resposta e fallback automático.',
        en: 'Orchestrated across multiple LLM providers (Gemini, Claude, Groq) with response validation and automatic fallback.',
      },
    },
    {
      title: { pt: 'Arquitetura dual-process', en: 'Dual-process architecture' },
      text: {
        pt: 'Camada web em Next.js + worker dedicado em Node.js, comunicando-se por Redis e filas (BullMQ).',
        en: 'Next.js web layer + a dedicated Node.js worker, communicating over Redis and queues (BullMQ).',
      },
    },
    {
      title: { pt: 'Billing recorrente', en: 'Recurring billing' },
      text: {
        pt: 'Assinaturas com prorata e créditos, webhooks idempotentes e validação HMAC.',
        en: 'Subscriptions with proration and credits, idempotent webhooks and HMAC validation.',
      },
    },
    {
      title: { pt: 'Loop contínuo de feedback', en: 'Continuous feedback loop' },
      text: {
        pt: 'Validação do output dos agentes e refinamento de prompts mantendo as features de LLM confiáveis.',
        en: 'Agent output validation and prompt refinement keeping LLM features reliable.',
      },
    },
  ],
  stats: [
    { value: 24, suffix: '+', label: { pt: 'tipos de nós no editor', en: 'node types in the editor' } },
    { value: 3, suffix: '', label: { pt: 'provedores de LLM', en: 'LLM providers' } },
    { value: 50, suffix: '', label: { pt: 'níveis de undo/redo', en: 'undo/redo levels' } },
    { value: 2, suffix: '', label: { pt: 'idiomas nativos (pt/en)', en: 'native languages (pt/en)' } },
  ],
  stack: [
    'Next.js', 'React', 'TypeScript', 'Node.js (Express)', 'PostgreSQL',
    'Redis', 'BullMQ', 'Socket.io', 'Docker', 'Mercado Pago', 'Tailwind CSS',
  ],
  architecture: [
    { title: { pt: 'Cliente', en: 'Client' }, nodes: [{ label: 'WhatsApp', sub: 'WPPConnect' }, { label: 'Web panel', sub: 'browser' }] },
    { title: { pt: 'Next.js · web', en: 'Next.js · web' }, nodes: [{ label: 'UI + API Routes' }, { label: 'Auth · Billing', sub: 'Clerk · Mercado Pago' }, { label: 'Producers', sub: 'BullMQ' }] },
    { title: { pt: 'Worker · Node', en: 'Worker · Node' }, nodes: [{ label: 'WhatsApp sessions', sub: 'Puppeteer' }, { label: 'Consumers', sub: 'BullMQ' }, { label: 'Bridge', sub: 'Socket.io' }] },
    { title: { pt: 'Dados · IA', en: 'Data · AI' }, nodes: [{ label: 'PostgreSQL', sub: 'Prisma' }, { label: 'Redis', sub: 'pub/sub + filas' }, { label: 'LLMs', sub: 'Gemini · Claude · Groq' }] },
  ],
  images: ['/projects/flunexapp/flunexapp.jpeg'],
};

export const projects = [
  {
    id: 'etp',
    name: { pt: 'Gerador de ETP', en: 'ETP Generator' },
    tagline: {
      pt: 'Govtech · RAG + Gemini para licitações (Lei 14.133/2021)',
      en: 'Govtech · RAG + Gemini for public procurement (Law 14.133/2021)',
    },
    description: {
      pt: 'Sistema que automatiza a geração de Estudos Técnicos Preliminares (ETPs) oficiais para a UENP, combinando IA generativa (Gemini) com um pipeline de RAG. Um processo que tomava horas agora finaliza em menos de dez minutos, no formato institucional exigido.',
      en: 'A system that automates the generation of official Preliminary Technical Studies (ETPs) for UENP, combining generative AI (Gemini) with a RAG pipeline. A process that took hours now finishes in under ten minutes, in the required institutional format.',
    },
    year: { pt: '2025 — Presente', en: '2025 — Present' },
    role: { pt: 'Designer & Implementador', en: 'Designer & Implementer' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Prisma', 'PostgreSQL', 'Redis', 'Gemini', 'RAG (worker)', 'NextAuth'],
    category: ['ai', 'institutional', 'fullstack'],
    status: 'production',
    liveUrl: 'https://geradoretpdigital.uenp.edu.br',
    repoUrl: null,
    private: true,
    logo: '/projects/etp/logo.png',
    images: ['/projects/etp/etp.jpeg'],
    architecture: [
      { title: { pt: 'Usuário', en: 'User' }, nodes: [{ label: 'Upload PDF' }, { label: 'Wizard · 8 passos', sub: 'IndexedDB' }] },
      { title: { pt: 'Next.js 16', en: 'Next.js 16' }, nodes: [{ label: 'App Router' }, { label: 'NextAuth' }, { label: 'Rate limit', sub: 'Redis' }] },
      { title: { pt: 'Worker RAG', en: 'RAG worker' }, nodes: [{ label: 'Extração + chunking', sub: 'pdf-parse' }, { label: 'Embeddings', sub: 'Gemini' }, { label: 'Vector store', sub: 'cosseno' }] },
      { title: { pt: 'Geração', en: 'Generation' }, nodes: [{ label: 'Gemini', sub: 'multi-key fallback' }, { label: 'PDF', sub: 'jsPDF / pdf-lib' }] },
    ],
    details: {
      overview: {
        pt: 'Construído em Next.js 16 (App Router) com um worker dedicado ao processamento de RAG. Em vez de jogar o PDF inteiro na IA, o worker extrai o texto, gera chunks e embeddings (Gemini) e monta uma vector store em memória; na geração, injeta apenas os fragmentos relevantes por similaridade de cosseno — respostas melhores com menos tokens.',
        en: 'Built in Next.js 16 (App Router) with a dedicated worker for RAG processing. Instead of throwing the whole PDF at the model, the worker extracts text, generates chunks and embeddings (Gemini) and builds an in-memory vector store; at generation time it injects only the relevant fragments by cosine similarity — better answers with fewer tokens.',
      },
      features: [
        { pt: 'Wizard guiado de 8 passos com persistência local em IndexedDB (TTL 6 dias) para sobreviver a um F5.', en: 'Guided 8-step wizard with local IndexedDB persistence (6-day TTL) to survive an accidental refresh.' },
        { pt: 'Pipeline RAG no worker: extração (pdf-parse) → chunking → embeddings (Gemini) → busca por similaridade de cosseno.', en: 'RAG pipeline in the worker: extraction (pdf-parse) → chunking → embeddings (Gemini) → cosine-similarity retrieval.' },
        { pt: 'Assistente de IA por campo que aprimora o texto no contexto do ETP, com rate limiting (10 req/min via Redis) e observabilidade (AIUsageLog).', en: 'Per-field AI assistant that refines text in the ETP context, with rate limiting (10 req/min via Redis) and observability (AIUsageLog).' },
        { pt: 'Geração com Multi-API Key Fallback do Gemini retornando JSON estruturado; editor "Zen Mode" para revisão humana (human-in-the-loop).', en: 'Generation with Gemini Multi-API-Key fallback returning structured JSON; a "Zen Mode" editor for human-in-the-loop review.' },
        { pt: 'Exportação em PDF paginado com índice (jsPDF/pdf-lib), soft-delete com purga em 30 dias e cron jobs (Vercel + node-cron).', en: 'Paginated PDF export with an index (jsPDF/pdf-lib), soft-delete with 30-day purge and cron jobs (Vercel + node-cron).' },
        { pt: 'Auth com NextAuth e painel admin protegido (duplo controle por grupo de dev) com métricas de uso da IA.', en: 'NextAuth auth and a protected admin panel (double dev-group check) with AI usage metrics.' },
      ],
    },
  },
  {
    id: 'aitec',
    name: { pt: 'AITEC — Plataforma de Inovação', en: 'AITEC — Innovation Platform' },
    tagline: {
      pt: 'Portal institucional full-stack · substituiu CMS legado (10×–20×)',
      en: 'Full-stack institutional portal · replaced a legacy CMS (10×–20×)',
    },
    description: {
      pt: 'Portal institucional da AITEC em Next.js 16 + React 19: área pública performática, painel administrativo completo com autenticação JWT e backend robusto (Prisma/PostgreSQL, Redis, e-mails, PDFs). Substituiu um CMS Joomla legado e sem documentação, com ganho de 10×–20× em performance.',
      en: 'AITEC\'s institutional portal in Next.js 16 + React 19: a performant public area, a full admin panel with JWT auth and a robust backend (Prisma/PostgreSQL, Redis, email, PDFs). It replaced an outdated, undocumented Joomla CMS, with a 10×–20× performance gain.',
    },
    year: { pt: '2025 — 2026', en: '2025 — 2026' },
    role: { pt: 'Engenheiro único', en: 'Sole engineer' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'TanStack Query', 'shadcn/ui', 'JWT (Jose)', 'PM2', 'Docker'],
    category: ['institutional', 'fullstack'],
    status: 'production',
    liveUrl: 'https://aitec.uenp.edu.br',
    repoUrl: null,
    private: true,
    logo: '/projects/aitec/logo.svg',
    images: ['/projects/aitec/aitec.jpeg'],
    details: {
      overview: {
        pt: 'Plataforma full-stack em Next.js 16 (App Router) e React 19, com área pública animada (Framer Motion) e SEO otimizado, painel administrativo completo e backend robusto. Substituiu um CMS Joomla legado e sem documentação.',
        en: 'A full-stack platform in Next.js 16 (App Router) and React 19, with an animated public area (Framer Motion) and tuned SEO, a complete admin panel and a robust backend. It replaced an undocumented legacy Joomla CMS.',
      },
      features: [
        { pt: 'Migração de CMS Joomla legado para Next.js 16 + React 19, com ganho de 10×–20× em performance.', en: 'Migrated a legacy Joomla CMS to Next.js 16 + React 19, with a 10×–20× performance gain.' },
        { pt: 'Painel admin (/admin) com autenticação JWT (Jose) + bcrypt e sessão em cookie, gestão de conteúdo, uploads e dashboard.', en: 'Admin panel (/admin) with JWT auth (Jose) + bcrypt and cookie sessions, content management, uploads and a dashboard.' },
        { pt: 'Backend com Prisma/PostgreSQL, cache e sessão em Redis (ioredis) e validação com Zod + React Hook Form.', en: 'Backend with Prisma/PostgreSQL, Redis (ioredis) cache & sessions and validation with Zod + React Hook Form.' },
        { pt: 'Proteção anti-bot com reCAPTCHA v2/v3, geração/leitura de PDFs (pdf-lib) e e-mails transacionais (nodemailer) por contexto.', en: 'Anti-bot protection with reCAPTCHA v2/v3, PDF generation/reading (pdf-lib) and per-context transactional emails (nodemailer).' },
        { pt: 'Deploy com PM2 + Docker-ready; Server Components e cache stale-while-revalidate para SEO e performance.', en: 'Deployed with PM2 + Docker-ready; Server Components and stale-while-revalidate caching for SEO and performance.' },
      ],
    },
  },
  {
    id: 'totem',
    name: { pt: 'TV Box Educacional × Receita Federal', en: 'Educational TV Box × Federal Revenue' },
    tagline: {
      pt: 'Edtech · terminais de IA (RAG) em TV Boxes reaproveitadas',
      en: 'Edtech · AI (RAG) terminals on repurposed TV Boxes',
    },
    description: {
      pt: 'Sistema de aprendizado assistido por IA que reaproveita TV Boxes apreendidas pela Receita Federal como terminais de consulta. Cada TV Box vira um terminal onde alunos perguntam (texto ou voz) sobre uma base de conhecimento curada por professores; as respostas vêm de um LLM via RAG (busca híbrida BM25 + vetorial no Weaviate).',
      en: 'An AI-assisted learning system that repurposes TV Boxes seized by Brazil\'s Federal Revenue as query terminals. Each TV Box becomes a terminal where students ask (by text or voice) about a teacher-curated knowledge base; answers come from an LLM via RAG (hybrid BM25 + vector search on Weaviate).',
    },
    year: { pt: '2026', en: '2026' },
    role: { pt: 'Full-Stack + IA + Mobile', en: 'Full-Stack + AI + Mobile' },
    stack: ['Next.js 16', 'React 19', 'Prisma 7', 'Auth.js', 'FastAPI', 'Dramatiq', 'Weaviate', 'LiteLLM', 'PostgreSQL', 'Redis', 'Kotlin', 'GeckoView', 'Docker'],
    category: ['ai', 'institutional', 'fullstack'],
    status: 'development',
    liveUrl: null,
    repoUrl: null,
    private: true,
    images: [],
    architecture: [
      { title: { pt: 'Cliente', en: 'Client' }, nodes: [{ label: 'TV Box', sub: 'APK Kotlin/GeckoView' }, { label: 'PWA /tv', sub: 'kiosk' }, { label: 'Admin panel' }] },
      { title: { pt: 'Next.js 16', en: 'Next.js 16' }, nodes: [{ label: 'Admin + PWA' }, { label: 'Auth.js', sub: 'lockout' }, { label: 'Prisma 7' }] },
      { title: { pt: 'Backend IA', en: 'AI backend' }, nodes: [{ label: 'FastAPI + Dramatiq' }, { label: 'LiteLLM', sub: 'Groq→Gemini→Cohere→Ollama' }, { label: 'STT / TTS' }] },
      { title: { pt: 'Dados · RAG', en: 'Data · RAG' }, nodes: [{ label: 'PostgreSQL · Redis' }, { label: 'MinIO', sub: 'arquivos' }, { label: 'Weaviate', sub: 'BM25 + vetorial' }] },
    ],
    details: {
      overview: {
        pt: 'Monorepo com três mundos: painel admin + PWA da TV Box em Next.js 16; backend de IA em FastAPI com worker Dramatiq (RAG, STT, TTS, crawler); e um APK Android nativo em Kotlin + GeckoView para o modo kiosk. A IA é provider-agnostic via LiteLLM, com cadeia de fallback e escolha de modelo por base de conhecimento.',
        en: 'A monorepo with three worlds: admin panel + TV Box PWA in Next.js 16; an AI backend in FastAPI with a Dramatiq worker (RAG, STT, TTS, crawler); and a native Android APK in Kotlin + GeckoView for kiosk mode. The AI is provider-agnostic via LiteLLM, with a fallback chain and per-knowledge-base model choice.',
      },
      features: [
        { pt: 'RAG híbrido no Weaviate (BM25 + vetorial, α=0.5) com reranker cross-encoder; LLM via LiteLLM em cadeia (Groq Llama 3.3 70B → Gemini 2.0 Flash → Cohere → Ollama local).', en: 'Hybrid RAG on Weaviate (BM25 + vector, α=0.5) with a cross-encoder reranker; LLM via a LiteLLM fallback chain (Groq Llama 3.3 70B → Gemini 2.0 Flash → Cohere → local Ollama).' },
        { pt: 'Ingestão multi-formato: PDF (pymupdf4llm), DOCX, TXT, Markdown, URL (trafilatura + Playwright p/ SPAs) e Imagem (OCR Tesseract pt); chunking semântico com dedup por hash e re-crawl incremental via HTTP 304.', en: 'Multi-format ingestion: PDF (pymupdf4llm), DOCX, TXT, Markdown, URL (trafilatura + Playwright for SPAs) and Image (Tesseract OCR pt); semantic chunking with hash dedup and incremental re-crawl via HTTP 304.' },
        { pt: 'Voz e acessibilidade: STT em cadeia (Groq Whisper → Deepgram → faster-whisper local), TTS neural (Edge-TTS + cache Redis), VLibras, alto contraste, fonte p/ dislexia e push-to-talk.', en: 'Voice & accessibility: STT chain (Groq Whisper → Deepgram → local faster-whisper), neural TTS (Edge-TTS + Redis cache), VLibras, high contrast, dyslexia font and push-to-talk.' },
        { pt: 'Ferramentas de operação: Diagnóstico RAG (latência por estágio embed→retrieval→rerank→LLM), Eval Harness (suíte de regressão por KB) e métricas (p50/p95, cache hit rate, heatmap de horários).', en: 'Operations tooling: RAG Diagnostics (per-stage latency embed→retrieval→rerank→LLM), an Eval Harness (per-KB regression suite) and analytics (p50/p95, cache hit rate, usage heatmap).' },
        { pt: 'Segurança: SSRF guard no crawler, defesa contra prompt injection, lockout de login + audit log e tokens de device revogáveis com TTL e QR de setup.', en: 'Security: SSRF guard on the crawler, prompt-injection defense, login lockout + audit log and revocable device tokens with TTL and QR setup.' },
        { pt: 'APK Kotlin + GeckoView que embarca o motor Gecko (independe do WebView antigo das TV Boxes), com modo kiosk via Device Owner + lock task e setup por tvbox.conf (pendrive/QR).', en: 'Kotlin + GeckoView APK embedding the Gecko engine (independent of the TV Boxes\' old WebView), with kiosk mode via Device Owner + lock task and setup via tvbox.conf (USB drive/QR).' },
      ],
    },
  },
  {
    id: 'fazenda-escola',
    name: 'Fazenda Escola',
    tagline: {
      pt: 'Portal institucional com CMS headless (Payload 3)',
      en: 'Institutional portal with a headless CMS (Payload 3)',
    },
    description: {
      pt: 'Portal institucional da Fazenda Escola da UENP (Campus Luiz Meneghel). CMS headless (Payload 3) onde a equipe gerencia setores, leilões, eventos, documentos, galeria e notícias. Deploy on-premise no servidor da universidade.',
      en: 'Institutional portal for UENP\'s teaching farm (Luiz Meneghel campus). A headless CMS (Payload 3) where the team manages sectors, auctions, events, documents, gallery and news. Deployed on-premise on the university\'s server.',
    },
    year: { pt: '2025 — 2026', en: '2025 — 2026' },
    role: { pt: 'Desenvolvedor full-stack', en: 'Full-stack developer' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Payload CMS 3', 'Drizzle ORM', 'PostgreSQL 17', 'Redis', 'Leaflet', 'Resend', 'Docker'],
    category: ['institutional', 'fullstack'],
    status: 'production',
    liveUrl: 'https://fazendaescola.uenp.edu.br',
    repoUrl: null,
    private: true,
    logo: '/projects/fazenda-escola/logo.png',
    images: ['/projects/fazenda-escola/fazenda_escola.jpeg'],
    details: {
      overview: {
        pt: 'Arquitetura com CMS headless: Payload CMS 3 + Drizzle ORM sobre PostgreSQL 17, com 14 páginas públicas e 7 coleções gerenciáveis. Deploy on-premise no servidor da UENP (Nginx + PM2 + Docker, proxy Cloudflare), com orçamento de performance agressivo.',
        en: 'A headless-CMS architecture: Payload CMS 3 + Drizzle ORM on PostgreSQL 17, with 14 public pages and 7 manageable collections. Deployed on-premise on UENP\'s server (Nginx + PM2 + Docker, Cloudflare proxy), with an aggressive performance budget.',
      },
      features: [
        { pt: 'CMS headless (Payload 3 + Drizzle ORM/PostgreSQL 17): a equipe gerencia 7 coleções — setores, leilões, eventos, documentos, galeria, notícias e usuários.', en: 'Headless CMS (Payload 3 + Drizzle ORM/PostgreSQL 17): the team manages 7 collections — sectors, auctions, events, documents, gallery, news and users.' },
        { pt: 'Deploy on-premise no servidor da UENP: Nginx + PM2 + Docker (PostgreSQL 17 + Redis 7), atrás de proxy Cloudflare.', en: 'On-premise deployment on UENP\'s server: Nginx + PM2 + Docker (PostgreSQL 17 + Redis 7), behind a Cloudflare proxy.' },
        { pt: 'Busca full-text com Orama, mapas com Leaflet e e-mails transacionais (React Email + Resend).', en: 'Full-text search with Orama, maps with Leaflet and transactional emails (React Email + Resend).' },
        { pt: 'Upload e otimização de imagens (Multer + Sharp).', en: 'Image upload and optimization (Multer + Sharp).' },
        { pt: 'Orçamento de performance: Lighthouse ≥ 95, LCP < 1.8s, INP < 100ms, CLS < 0.1.', en: 'Performance budget: Lighthouse ≥ 95, LCP < 1.8s, INP < 100ms, CLS < 0.1.' },
      ],
    },
  },
  {
    id: 'suap',
    name: { pt: 'Integrações SUAP', en: 'SUAP Integrations' },
    tagline: {
      pt: 'Integração entre sistemas institucionais',
      en: 'Integration across institutional systems',
    },
    description: {
      pt: 'Projetei as conexões entre o sistema central da UENP (SUAP — plataforma em Django) e plataformas externas em WordPress/PHP e Next.js, garantindo consistência de dados nas duas pontas e eliminando passos manuais.',
      en: 'Designed the connections between UENP\'s central system (SUAP — a Django platform) and external platforms on WordPress/PHP and Next.js, ensuring data consistency on both ends and eliminating manual steps.',
    },
    year: { pt: '2025 — Presente', en: '2025 — Present' },
    role: { pt: 'Engenheiro de integração', en: 'Integration engineer' },
    stack: ['Python', 'Django', 'REST APIs', 'WordPress/PHP', 'Next.js'],
    category: ['institutional'],
    status: 'production',
    liveUrl: null,
    repoUrl: null,
    private: true,
    images: [],
    details: {
      overview: {
        pt: 'Camada de integração entre sistemas que nunca foram pensados para conversar, eliminando trabalho manual interdepartamental.',
        en: 'An integration layer between systems never meant to talk to each other, eliminating manual interdepartmental work.',
      },
      features: [
        { pt: 'Conexões entre SUAP (Django) e plataformas em WordPress/PHP e Next.js.', en: 'Connections between SUAP (Django) and platforms on WordPress/PHP and Next.js.' },
        { pt: 'Consistência de dados nas duas pontas.', en: 'Data consistency on both ends.' },
        { pt: 'Eliminação de passos manuais em fluxos administrativos.', en: 'Elimination of manual steps in administrative flows.' },
      ],
    },
  },
];

/** Filtros: id canônico + rótulos bilíngues. */
export const filters = [
  { id: 'all', pt: 'Todos', en: 'All' },
  { id: 'ai', pt: 'IA / LLM', en: 'AI / LLM' },
  { id: 'institutional', pt: 'Institucional', en: 'Institutional' },
  { id: 'fullstack', pt: 'Full Stack', en: 'Full Stack' },
];
