'use client';

import { useEffect, useState } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Efeito de máquina de escrever que alterna entre frases (zero deps).
 * Acessível: o texto animado é aria-hidden; um rótulo estável fica em sr-only.
 * Respeita prefers-reduced-motion (mostra a frase completa, sem digitar).
 */
interface RotatingTextProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

export default function RotatingText({
  phrases = [],
  typingSpeed = 55,
  deletingSpeed = 28,
  pause = 1600,
  className,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReduced()), []);

  useEffect(() => {
    if (reduced) return;
    const current = phrases[index % phrases.length] ?? '';
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pause);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setPhase('typing');
        setIndex((i) => (i + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, phrases, typingSpeed, deletingSpeed, pause, reduced]);

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[2px] -translate-y-0.5 animate-pulse bg-spark align-middle text-transparent">
          |
        </span>
      </span>
    </span>
  );
}
