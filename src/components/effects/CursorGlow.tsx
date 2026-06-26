'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Luz suave que segue o ponteiro (não substitui o cursor nativo).
 * Só em dispositivos com hover real e sem reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(ok);
    if (!ok) return;

    const el = ref.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop); // re-arma o loop se estava parado
    };
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      if (el) el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      // para o loop quando converge (ponteiro parado) — idle custa zero
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[400px] w-[400px] rounded-full opacity-50 mix-blend-screen will-change-transform"
      style={{
        background:
          'radial-gradient(circle, color-mix(in oklab, var(--color-accent-500) 22%, transparent), transparent 60%)',
      }}
    />
  );
}
