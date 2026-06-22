'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { markSecret, party } from '@/lib/secrets';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
const COLORS = ['#14b8a6', '#10b981', '#34d399', '#6ee7b7', '#bef264'];
const isPt = () =>
  typeof document !== 'undefined' && (document.documentElement.lang || 'pt').startsWith('pt');

export default function EasterEgg() {
  const [party, setParty] = useState(false);
  const [toast, setToast] = useState(null);

  // 1) mensagem no console para quem inspeciona
  useEffect(() => {
    const title = 'color:#34d399;font-size:13px;font-weight:700;font-family:monospace';
    const body = 'color:#a1a1b5;font-size:12px;font-family:monospace';
    // eslint-disable-next-line no-console
    console.log('%cgm. você é curioso(a) 👀', title);
    // eslint-disable-next-line no-console
    console.log(
      '%cConstruído por Gabriel Mello — Next.js · GSAP · Tailwind.\n' +
        'Easter eggs escondidos: Konami Code (↑↑↓↓←→←→ B A), digite "gm", ou troque de aba 👀\n' +
        'Bora conversar: gabrielmellomoraes1407@gmail.com',
      body,
    );
  }, []);

  // 2) título da aba muda quando você sai
  useEffect(() => {
    const original = document.title;
    const onVis = () => {
      if (document.hidden) {
        document.title = isPt() ? '👀 ei, volta aqui!' : '👀 hey, come back!';
        markSecret('peek');
      } else {
        document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      document.title = original;
    };
  }, []);

  // 3) Konami + 4) digitar "gm"
  useEffect(() => {
    let kPos = 0;
    let gm = '';
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // Konami
      kPos = key === KONAMI[kPos] ? kPos + 1 : key === KONAMI[0] ? 1 : 0;
      if (kPos === KONAMI.length) {
        kPos = 0;
        markSecret('konami');
        party();
      }

      // "gm"
      gm = (gm + key).slice(-2);
      if (gm === 'gm') {
        markSecret('gm');
        setToast(isPt() ? 'gm ☀️ bom te ver por aqui' : 'gm ☀️ good to see you');
        setTimeout(() => setToast(null), 2600);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // confete disparado por evento (Konami, todos os segredos, etc.)
  useEffect(() => {
    const onParty = () => {
      setParty(true);
      setTimeout(() => setParty(false), 4200);
    };
    window.addEventListener('gm:party', onParty);
    return () => window.removeEventListener('gm:party', onParty);
  }, []);

  const pieces = Array.from({ length: 70 });

  return (
    <>
      {/* toast "gm" */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-white/10 bg-ink-900/90 px-5 py-3 font-mono text-sm text-fg shadow-2xl backdrop-blur"
          >
            <span className="text-spark">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confete Konami */}
      <AnimatePresence>
        {party && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[85] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {pieces.map((_, i) => {
              const left = (i * 53) % 100;
              const delay = (i % 12) * 0.06;
              const size = 6 + (i % 5) * 3;
              return (
                <motion.span
                  key={i}
                  className="absolute top-[-5%] rounded-[2px]"
                  style={{
                    left: `${left}%`,
                    width: size,
                    height: size * 1.6,
                    background: COLORS[i % COLORS.length],
                  }}
                  initial={{ y: '-10vh', rotate: 0, opacity: 1 }}
                  animate={{ y: '110vh', rotate: 540 }}
                  transition={{ duration: 2.6 + (i % 4) * 0.4, delay, ease: 'easeIn' }}
                />
              );
            })}
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink-900/90 px-5 py-3 font-mono text-sm text-fg shadow-2xl backdrop-blur"
            >
              <span className="text-spark">gm.</span> {isPt() ? 'você achou o easter egg' : 'you found the easter egg'} 🌱
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
