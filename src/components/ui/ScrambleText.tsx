'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
}

/**
 * Efeito "decode": o texto embaralha e resolve ao entrar na viewport.
 * SSR/no-JS e leitores de tela recebem o texto final direto.
 */
export default function ScrambleText({ text, className, speed = 1 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    // antes de entrar em vista (ou ao trocar de idioma), mantém o texto sincronizado
    if (!inView) {
      setOutput(text);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text);
      return;
    }
    let frame = 0;
    const total = Math.ceil((text.length + 8) / speed);
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / total) * text.length);
      let next = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === ' ') next += text[i];
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (frame >= total) {
        setOutput(text);
        clearInterval(id);
      }
    }, 28);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
