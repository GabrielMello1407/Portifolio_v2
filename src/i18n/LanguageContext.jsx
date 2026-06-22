'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { dictionary } from './dictionary';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'gm-lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('pt');

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

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setLang(lang === 'pt' ? 'en' : 'pt');

  const value = {
    lang,
    setLang,
    toggle,
    t: dictionary[lang],
    /** escolhe a string certa de um campo bilíngue { pt, en } */
    tx: (field) => (field && typeof field === 'object' ? field[lang] : field),
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de LanguageProvider');
  return ctx;
}
