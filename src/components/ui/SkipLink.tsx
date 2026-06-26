'use client';

import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Link "pular para o conteúdo" (WCAG 2.4.1 Bypass Blocks). Invisível até
 * receber foco por teclado. Move o foco pro <main id="top"> (tabindex -1),
 * driblando o scroll suave do Lenis com um onClick explícito.
 */
export default function SkipLink() {
  const { lang } = useLanguage();
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById('top');
        if (main) {
          main.focus();
          main.scrollIntoView({ block: 'start' });
        }
      }}
      className="sr-only rounded-lg border border-accent-500/40 bg-ink-900 px-4 py-2.5 text-sm font-medium text-fg shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
    </a>
  );
}
