'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, Check, Trophy } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getSecrets, party, TOTAL_SECRETS, SECRET_IDS } from '@/lib/secrets';

const META = {
  konami: {
    label: 'Konami Code',
    hint: { pt: 'uma sequência clássica… ↑ ↑ ↓ ↓ ← → ← → B A', en: 'a classic sequence… ↑ ↑ ↓ ↓ ← → ← → B A' },
  },
  gm: {
    label: 'gm',
    hint: { pt: 'cumprimente como um dev — digite 2 letrinhas', en: 'greet like a dev — type 2 little letters' },
  },
  peek: {
    label: { pt: 'Espiadinha', en: 'Peek-a-boo' },
    hint: { pt: 'troque de aba e volte 👀', en: 'switch tabs and come back 👀' },
  },
  terminal: {
    label: 'Terminal',
    hint: { pt: 'tem um atalho… aperte / ou ⌘K', en: 'there is a shortcut… press / or ⌘K' },
  },
  sudo: {
    label: 'sudo',
    hint: { pt: 'no terminal, peça permissão de admin 😏', en: 'in the terminal, ask for admin permission 😏' },
  },
};

export default function SecretsTracker() {
  const { lang } = useLanguage();
  const pt = lang === 'pt';
  const [found, setFound] = useState([]);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setFound(getSecrets());
    const onSecret = (e) => setFound((f) => (f.includes(e.detail.id) ? f : [...f, e.detail.id]));
    const onComplete = () => {
      setDone(true);
      setOpen(true);
      party();
    };
    window.addEventListener('gm:secret', onSecret);
    window.addEventListener('gm:complete', onComplete);
    return () => {
      window.removeEventListener('gm:secret', onSecret);
      window.removeEventListener('gm:complete', onComplete);
    };
  }, []);

  const n = found.length;
  if (n === 0) return null; // só aparece após o 1º segredo

  const tx = (v) => (v && typeof v === 'object' ? v[lang] : v);
  const complete = n >= TOTAL_SECRETS;

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="glass card-glow mb-2 w-72 rounded-2xl border border-white/10 p-4"
          >
            <p className="mb-3 flex items-center gap-2 label-mono text-xs text-accent-300">
              {complete ? <Trophy className="h-4 w-4 text-spark" /> : null}
              {pt ? 'Caça aos segredos' : 'Secret hunt'}
            </p>
            <ul className="space-y-2.5">
              {SECRET_IDS.map((id) => {
                const got = found.includes(id);
                const m = META[id];
                return (
                  <li key={id} className="flex items-start gap-2.5 text-sm">
                    {got ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                    ) : (
                      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" />
                    )}
                    <span className={got ? 'text-fg' : 'text-fg-muted'}>
                      {got ? tx(m.label) : tx(m.hint)}
                    </span>
                  </li>
                );
              })}
            </ul>
            {complete && (
              <p className="mt-3 border-t border-white/10 pt-3 text-xs text-fg-muted">
                {pt ? '🏆 Todos encontrados! Manda um “gm” no meu email 😄' : '🏆 All found! Send me a “gm” by email 😄'}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={pt ? 'Segredos encontrados' : 'Secrets found'}
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold shadow-lg transition-colors ${
          complete
            ? 'border-spark/40 bg-ink-900/80 text-spark'
            : 'border-white/10 bg-ink-900/80 text-fg-muted hover:text-fg'
        }`}
      >
        {complete ? <Trophy className="h-4 w-4" /> : <span>🔓</span>}
        {n}/{TOTAL_SECRETS}
      </button>
    </div>
  );
}
