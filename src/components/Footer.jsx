'use client';

import { ArrowUp, Github, Linkedin } from 'lucide-react';
import Logo from './ui/Logo';
import { useLanguage } from '@/i18n/LanguageContext';
import { site } from '@/data/site';

export default function Footer() {
  const { t } = useLanguage();
  const year = 2026;

  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-fg-muted">{t.footer.builtWith}</p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex gap-3">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#top"
              aria-label={t.footer.backToTop}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
            >
              <ArrowUp className="h-5 w-5" />
            </a>
          </div>
          <p className="font-mono text-xs text-fg-subtle">
            © {year} Gabriel Mello. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
