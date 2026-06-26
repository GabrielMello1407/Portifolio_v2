'use client';

import Counter from './ui/Counter';
import Reveal from './ui/Reveal';
import { useLanguage } from '@/i18n/LanguageContext';

const STATS = [
  { value: 3, suffix: '+', pt: 'anos de experiência', en: 'years of experience' },
  { value: 6, suffix: '', pt: 'produtos em produção', en: 'products in production' },
  { value: 20, suffix: '+', pt: 'tecnologias no stack', en: 'technologies in the stack' },
  { value: 5, suffix: '', pt: 'certificações AWS', en: 'AWS certifications' },
];

export default function Stats() {
  const { lang } = useLanguage();
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-6">
      <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.en} className="bg-ink-950 p-6 text-center sm:p-8">
            <div className="text-gradient font-display text-4xl font-bold sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs leading-tight text-fg-muted sm:text-sm">
              {lang === 'pt' ? s.pt : s.en}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
