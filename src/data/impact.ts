/**
 * Métricas de impacto (antes → depois) dos projetos — números reais e
 * defensáveis. Renderizadas pela seção Impact com barras animadas.
 * `afterPct` = comprimento da barra "depois" (0-100); a "antes" é sempre cheia.
 */
import type { Bilingual } from '@/types';

export interface Impact {
  project: string;
  label: Bilingual;
  big: string; // número-destaque
  unit: Bilingual;
  before: Bilingual;
  after: Bilingual;
  afterPct: number;
}

export const impact: Impact[] = [
  {
    project: 'Gerador de ETP',
    label: { pt: 'Tempo pra gerar um ETP oficial', en: 'Time to generate an official ETP' },
    big: '18×',
    unit: { pt: 'mais rápido', en: 'faster' },
    before: { pt: '≈ 3 horas', en: '≈ 3 hours' },
    after: { pt: '< 10 min', en: '< 10 min' },
    afterPct: 6,
  },
  {
    project: 'AITEC',
    label: { pt: 'Performance do portal vs. CMS legado', en: 'Portal performance vs. legacy CMS' },
    big: '10–20×',
    unit: { pt: 'mais rápido', en: 'faster' },
    before: { pt: 'CMS Joomla', en: 'Joomla CMS' },
    after: { pt: 'Next.js 16', en: 'Next.js 16' },
    afterPct: 7,
  },
  {
    project: 'TV Box × Receita Federal',
    label: { pt: 'Custo de hardware por terminal', en: 'Hardware cost per terminal' },
    big: 'R$ 0',
    unit: { pt: 'de equipamento', en: 'in equipment' },
    before: { pt: 'Comprar terminais', en: 'Buy new terminals' },
    after: { pt: 'TV Box reaproveitada', en: 'Repurposed TV Box' },
    afterPct: 4,
  },
];
