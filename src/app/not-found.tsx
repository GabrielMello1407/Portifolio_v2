'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const copy = {
  pt: {
    noSuch: 'arquivo ou diretório inexistente',
    lost: 'Essa página não existe — mas o resto do site sim.',
    home: 'Voltar ao início',
  },
  en: {
    noSuch: 'no such file or directory',
    lost: "This page doesn't exist — but the rest of the site does.",
    home: 'Back home',
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const [pt, setPt] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gm-lang');
      if (saved) setPt(saved === 'pt');
      else setPt((navigator.language || '').toLowerCase().startsWith('pt'));
    } catch {
      /* mantém pt */
    }
  }, []);

  const t = pt ? copy.pt : copy.en;
  const path = pathname || '/desconhecido';

  return (
    <main className="relative grid min-h-dvh place-items-center px-5 py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-accent-600),transparent_65%)] opacity-20 blur-3xl" />

      <div className="relative w-full max-w-lg">
        {/* janela do terminal */}
        <div className="glass card-glow overflow-hidden rounded-2xl border border-accent-500/20">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-xs text-fg-subtle">gabriel@portfolio:~</span>
          </div>
          <div className="px-5 py-5 font-mono text-sm leading-relaxed">
            <p className="text-fg">
              <span className="text-accent-300">❯</span> cd {path}
            </p>
            <p className="mt-1 text-fg-muted">cd: {path}: {t.noSuch}</p>
            <p className="mt-3 text-fg">
              <span className="text-accent-300">❯</span> <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>

        <div className="mt-9 text-center">
          <p className="font-display text-7xl font-bold tracking-tight text-gradient">404</p>
          <p className="mx-auto mt-3 max-w-sm text-fg-muted">{t.lost}</p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/25 transition-shadow hover:shadow-xl hover:shadow-accent-600/40"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
