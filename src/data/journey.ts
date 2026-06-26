/**
 * Linha do tempo da trajetória — formação, carreira e sistemas construídos,
 * em ordem cronológica. Renderizada pela seção Journey (timeline animada).
 * Campos traduzíveis usam { pt, en } e são resolvidos via tx().
 */
import type { Bilingual } from '@/types';

export type JourneyType = 'education' | 'role' | 'system';

export interface Milestone {
  year: string;
  type: JourneyType;
  title: Bilingual;
  org?: Bilingual;
  text: Bilingual;
  tags?: string[];
}

export const journey: Milestone[] = [
  {
    year: '2019 — 2022',
    type: 'education',
    title: { pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', en: 'Tech degree — Systems Analysis & Development' },
    org: { pt: 'FATEC Ourinhos', en: 'FATEC Ourinhos' },
    text: {
      pt: 'Onde a base foi construída: lógica, estruturas de dados e os primeiros sistemas de verdade.',
      en: 'Where the foundation was laid: logic, data structures and my first real systems.',
    },
  },
  {
    year: '2023',
    type: 'role',
    title: { pt: 'Front-End Developer (voluntário)', en: 'Front-End Developer (volunteer)' },
    org: { pt: 'SouJunior Labs', en: 'SouJunior Labs' },
    text: {
      pt: 'Primeiro código em time, perto de produção — junto com designers e back-end.',
      en: 'First time coding in a team, close to production — alongside designers and backend.',
    },
    tags: ['React', 'TypeScript'],
  },
  {
    year: '2025',
    type: 'role',
    title: { pt: 'Developer Analyst', en: 'Developer Analyst' },
    org: { pt: 'UENP — Universidade Estadual do Norte do Paraná', en: 'UENP — State University of Northern Paraná' },
    text: {
      pt: 'O ponto de virada: dono do ecossistema digital da universidade — IA, integrações (SUAP) e decisões de arquitetura que afetam todos os campi.',
      en: "The turning point: owning the university's digital ecosystem — AI, integrations (SUAP) and architecture decisions across every campus.",
    },
  },
  {
    year: '2025',
    type: 'system',
    title: { pt: 'FlunexApp', en: 'FlunexApp' },
    text: {
      pt: 'SaaS multi-tenant de automação de WhatsApp, do zero ao deploy: editor visual de fluxos, IA multi-LLM e billing recorrente.',
      en: 'Multi-tenant WhatsApp-automation SaaS, from scratch to deploy: visual flow editor, multi-LLM AI and recurring billing.',
    },
    tags: ['Next.js', 'Node.js', 'Redis', 'BullMQ'],
  },
  {
    year: '2025',
    type: 'system',
    title: { pt: 'Gerador de ETP', en: 'ETP Generator' },
    text: {
      pt: 'IA + RAG pra gerar Estudos Técnicos Preliminares oficiais em menos de 10 minutos.',
      en: 'AI + RAG to generate official Preliminary Technical Studies in under 10 minutes.',
    },
    tags: ['Next.js 16', 'Gemini', 'RAG'],
  },
  {
    year: '2025',
    type: 'system',
    title: { pt: 'AITEC', en: 'AITEC' },
    text: {
      pt: 'Portal institucional que substituiu um CMS Joomla legado — 10× a 20× mais rápido.',
      en: 'Institutional portal that replaced a legacy Joomla CMS — 10× to 20× faster.',
    },
    tags: ['React 19', 'Prisma', 'PostgreSQL'],
  },
  {
    year: '2025 — 2026',
    type: 'system',
    title: { pt: 'Fazenda Escola', en: 'Fazenda Escola' },
    text: {
      pt: 'Portal com CMS headless (Payload 3), deploy on-premise no servidor da universidade.',
      en: 'Portal with a headless CMS (Payload 3), deployed on-premise on the university server.',
    },
    tags: ['Payload CMS', 'Drizzle', 'PostgreSQL 17'],
  },
  {
    year: '2026',
    type: 'system',
    title: { pt: 'TV Box × Receita Federal', en: 'TV Box × Federal Revenue' },
    text: {
      pt: 'O mais recente: terminais de IA (RAG híbrido) em TV Boxes apreendidas, com app Android nativo em Kotlin.',
      en: 'The latest: AI terminals (hybrid RAG) on seized TV Boxes, with a native Android app in Kotlin.',
    },
    tags: ['Python', 'FastAPI', 'Weaviate', 'Kotlin'],
  },
];
