'use client';

import dynamic from 'next/dynamic';

/**
 * Efeitos não-críticos carregados de forma lazy (ssr: false) — tira
 * GSAP/Lenis do caminho crítico de render e melhora o TBT/FCP.
 */
const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false });
const CursorGlow = dynamic(() => import('./CursorGlow'), { ssr: false });
const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false });
const EasterEgg = dynamic(() => import('./EasterEgg'), { ssr: false });
const Terminal = dynamic(() => import('./Terminal'), { ssr: false });
const SecretsTracker = dynamic(() => import('./SecretsTracker'), { ssr: false });

export default function Effects() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <SmoothScroll />
      <EasterEgg />
      <Terminal />
      <SecretsTracker />
    </>
  );
}
