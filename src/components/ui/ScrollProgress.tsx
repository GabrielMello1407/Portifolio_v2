'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Barra fina de progresso de leitura no topo da página.
 * Decorativa (aria-hidden) — escala no eixo X conforme o scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-400 via-accent-300 to-spark"
    />
  );
}
