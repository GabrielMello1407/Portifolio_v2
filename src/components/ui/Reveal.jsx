'use client';

import { motion } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1];

/**
 * Revela o conteúdo ao entrar na viewport.
 * `delay` em segundos, `y` deslocamento inicial.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  as = 'div',
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: easing }}
    >
      {children}
    </MotionTag>
  );
}

/** Container que escalona a animação dos filhos diretos. */
export function RevealStagger({ children, className, stagger = 0.08, once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 22, as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
      }}
    >
      {children}
    </MotionTag>
  );
}
