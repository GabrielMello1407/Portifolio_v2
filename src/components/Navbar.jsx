'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowDownToLine, TerminalSquare } from 'lucide-react';
import Logo from './ui/Logo';
import LanguageSwitcher from './ui/LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageContext';
import { resumeByLang } from '@/i18n/dictionary';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#top', label: t.nav.home },
    { href: '#projects', label: t.nav.work },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4',
          scrolled ? 'glass card-glow shadow-2xl shadow-black/40' : 'border border-transparent bg-transparent',
        )}
      >
        <a href="#top" aria-label="Gabriel Mello" className="shrink-0">
          <Logo />
        </a>

        {/* Links desktop */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-terminal'))}
            aria-label="Terminal (/ · ⌘K)"
            title="Terminal — / · ⌘K"
            className="hidden h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-fg-muted transition-colors hover:border-accent-500/40 hover:text-accent-300 sm:grid"
          >
            <TerminalSquare className="h-4 w-4" />
          </button>
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href={resumeByLang[lang]}
            download
            className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <ArrowDownToLine className="h-4 w-4" />
            {t.nav.resume}
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-fg lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.nav.menu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="glass card-glow absolute top-full mt-2 w-[calc(100%-2rem)] max-w-6xl rounded-2xl p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/10 px-2 pt-3">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent('open-terminal'));
                  }}
                  aria-label="Terminal"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-fg-muted"
                >
                  <TerminalSquare className="h-4 w-4" />
                </button>
              </div>
              <a
                href={resumeByLang[lang]}
                download
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-4 py-2 text-sm font-semibold text-white"
              >
                <ArrowDownToLine className="h-4 w-4" />
                {t.nav.resume}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
