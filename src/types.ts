import type Lenis from 'lenis';

export type Lang = 'pt' | 'en';

/** Campo que pode ser string simples ou par bilíngue, resolvido por tx(). */
export type Bilingual = string | { pt: string; en: string };

export type ProjectStatus = 'production' | 'development' | 'volunteer';

export interface ArchitectureNode {
  label: string;
  sub?: string;
}

export interface ArchitectureLayer {
  title: Bilingual;
  nodes: ArchitectureNode[];
}

export interface ProjectDetails {
  overview: Bilingual;
  features: Bilingual[];
}

export interface Project {
  id: string;
  name: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  year: Bilingual;
  role: Bilingual;
  stack: string[];
  category: string[];
  status?: ProjectStatus;
  liveUrl: string | null;
  repoUrl: string | null;
  logo?: string;
  images?: string[];
  architecture?: ArchitectureLayer[];
  details?: ProjectDetails;
}

export interface FeaturedHighlight {
  title: Bilingual;
  text: Bilingual;
}

export interface FeaturedStat {
  value: number;
  suffix: string;
  label: Bilingual;
}

export interface Featured {
  name: string;
  logo: string;
  wordmark: string;
  liveUrl: string;
  tagline: Bilingual;
  year: Bilingual;
  role: Bilingual;
  summary: Bilingual;
  highlights: FeaturedHighlight[];
  stats: FeaturedStat[];
  stack: string[];
  architecture?: ArchitectureLayer[];
  images?: string[];
}

export interface Filter {
  id: string;
  pt: string;
  en: string;
}

/** Mensagem do chat de IA. */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/** Um dia no heatmap de contribuições do GitHub. */
export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubData {
  ok: boolean;
  total: number;
  contributions: ContributionDay[];
  repos: number | null;
  followers: number | null;
  profile: string;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
