/**
 * Base de conhecimento (RAG-lite) injetada no system prompt do chat.
 * Mantida em inglês conciso — o modelo responde no idioma da pergunta.
 */
export const PROFILE = `
GABRIEL MELLO — Software Engineer (AI Integration · Full-Stack)
Location: Jacarezinho, PR, Brazil. Open to remote, hybrid and on-site roles.
Contact: gabrielmellomoraes1407@gmail.com · github.com/GabrielMello1407 · linkedin.com/in/gabrielmellomoraes
Profile: 3+ years of professional experience (JavaScript/TypeScript, React, Next.js, Node.js). Works at the intersection of full-stack engineering and applied AI — building LLM-powered features that run in production. Strong at open-ended problems: ambiguous requirements, undocumented codebases and integrations between systems that were never meant to talk.

EXPERIENCE:
- Developer Analyst @ UENP (State University of Northern Paraná), Feb 2025–present, hybrid. Owns the university's digital ecosystem across all campuses: AI tooling, legacy CMS replacement, system integrations, architecture decisions.
- Founder & Lead Engineer @ FlunexApp, 2026–present, remote. Architected and built a multi-tenant SaaS from scratch — full lifecycle (architecture, dev, infra, billing, ops).
- Volunteer Front-End Developer @ SouJunior Labs (Care4You), Nov 2023–present.

SKILLS:
- Frontend: React, Next.js, TypeScript (strict), Angular, Tailwind CSS, ShadCN UI, TanStack Query, Zustand, Framer Motion, GSAP.
- Backend: Node.js (Express), Python (Django/FastAPI), REST APIs, auth/RBAC, webhooks (HMAC), background jobs/queues (BullMQ, Dramatiq).
- Data & cache: PostgreSQL, MySQL, Redis (cache + pub/sub).
- AI / LLMs: Gemini, Claude, GPT-4, Groq, RAG, prompt engineering, agent-output validation, Weaviate (hybrid BM25 + vector), LiteLLM, embeddings.
- Cloud / DevOps: AWS (EC2, RDS, VPC, S3, IAM — 5 certifications), Docker, CI/CD, Grafana, Git, PM2, Nginx.
- Mobile: React Native, Kotlin (Android, GeckoView).
- Quality: Jest, Testing Library, Zod, ESLint, code review.

PROJECTS:
1. FlunexApp (flagship, in production) — multi-tenant SaaS for WhatsApp automation. No-code visual flow editor (24 node types), AI flow generation across multiple LLM providers (Gemini/Claude/Groq) with validation + fallback, recurring billing (proration, credits, idempotent webhooks, HMAC), strict multi-tenancy + RBAC, pt/en i18n, anti-abuse system. Dual-process architecture: Next.js web + a dedicated Node worker over Redis + BullMQ. Stack: Next.js, React, TypeScript, Node/Express, PostgreSQL, Redis, BullMQ, Socket.io, Docker, Mercado Pago. Live: flunexapp.com.
2. ETP Generator (UENP, in production) — AI tool that generates official Preliminary Technical Studies (Brazilian procurement law 14.133/2021). Next.js 16 + a dedicated RAG worker (pdf-parse extraction, chunking, Gemini embeddings, in-memory vector store with cosine similarity), Gemini multi-key fallback, NextAuth, Redis rate limiting, admin panel. Reduced hours of human work to under 10 minutes. Live: geradoretpdigital.uenp.edu.br.
3. AITEC — Innovation Platform (in production) — full-stack institutional portal that replaced a legacy Joomla CMS (10×–20× faster). Next.js 16, React 19, Prisma/PostgreSQL, Redis, custom JWT auth (Jose) + bcrypt, reCAPTCHA, pdf-lib, nodemailer, PM2/Docker. Live: aitec.uenp.edu.br.
4. Educational TV Box × Brazilian Federal Revenue (in development) — reuses TV Boxes seized by the Federal Revenue as AI query terminals for students. Monorepo: Next.js 16 admin + PWA, FastAPI + Dramatiq AI backend, native Kotlin/GeckoView Android APK for kiosk mode. Hybrid RAG on Weaviate (BM25 + vector) + cross-encoder reranker, LiteLLM fallback chain (Groq→Gemini→Cohere→Ollama), STT/TTS, VLibras, SSRF guard, prompt-injection defense.
5. Fazenda Escola (in production) — institutional portal for UENP's teaching farm. Headless CMS: Payload CMS 3 + Drizzle ORM on PostgreSQL 17, on-premise (Nginx + PM2 + Docker + Cloudflare), 14 pages, 7 collections, Orama search, Leaflet maps, Resend emails. Live: fazendaescola.uenp.edu.br.
6. SUAP Integrations (in production) — integration layer connecting UENP's Django-based SUAP system to external WordPress/PHP and Next.js platforms.
7. RIUENP — UENP Institutional Repository (in production) — restyled the university's DSpace-based digital repository (theses, projects and academic output across all campuses). DSpace 7 theme customization (Angular + SCSS) applying UENP's visual identity over the generic default theme. Underlying stack: Angular frontend, Java/Tomcat backend, PostgreSQL, full-text search with Apache Solr. Live: repositorio.uenp.edu.br.

IMPACT HIGHLIGHTS: ETP generation cut from ~hours to under 10 minutes (~18× faster); AITEC portal 10×–20× faster than the legacy Joomla CMS it replaced; TV Box terminals reuse hardware seized by the Federal Revenue at ~zero equipment cost; FlunexApp generates conversational flows across 3 LLM providers (Gemini/Claude/Groq) with validation + automatic fallback.

EDUCATION: Associate Degree in Systems Analysis and Development — FATEC Ourinhos (2019–2022). Extension in Computer Science — UENP.
CERTIFICATIONS: AWS Educate (Cloud 101, Security, Networking, Databases, Compute & Storage) 2025; NLW Journey — React Native (Rocketseat) 2024; React Zero to Mastery + Next.js + Redux (Udemy/Origamid); OutSystems (Tata Consultancy Services).
LANGUAGES: Portuguese (native), English (fluent technical reading/writing, basic conversation).
`;
