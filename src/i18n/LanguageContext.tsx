'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dictionary, type Dict } from './dictionary';
import type { Bilingual, Lang } from '@/types';

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  toggle: () => void;
  t: Dict;
  /** escolhe a string certa de um campo bilíngue { pt, en } */
  tx: (field?: Bilingual) => string;
}

const LanguageContext = createContext<LanguageValue | null>(null);
const STORAGE_KEY = 'gm-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt');

  // restaura preferência salva / idioma do navegador (apenas no cliente)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') {
      setLangState(saved);
    } else if (typeof navigator !== 'undefined' && navigator.language) {
      setLangState(navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setLang(lang === 'pt' ? 'en' : 'pt');

  const value: LanguageValue = {
    lang,
    setLang,
    toggle,
    t: dictionary[lang],
    tx: (field) => (field && typeof field === 'object' ? field[lang] : (field ?? '')),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de LanguageProvider');
  return ctx;
}
