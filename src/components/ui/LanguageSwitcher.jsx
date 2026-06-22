'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const langs = ['pt', 'en'];

export default function LanguageSwitcher({ className }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs font-medium',
        className,
      )}
      role="group"
      aria-label="Selecionar idioma / Select language"
    >
      {langs.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={cn(
              'relative z-10 rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors',
              active ? 'text-ink-950' : 'text-fg-muted hover:text-fg',
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-300 to-accent-200"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
