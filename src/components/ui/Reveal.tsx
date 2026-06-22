'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'span';
}

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
}: RevealProps) {
  const MotionTag = as === 'span' ? motion.span : motion.div;
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

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}

/** Container que escalona a animação dos filhos diretos. */
export function RevealStagger({ children, className, stagger = 0.08, once = true }: StaggerProps) {
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

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: 'div' | 'span';
}

export function RevealItem({ children, className, y = 22, as = 'div' }: RevealItemProps) {
  const MotionTag = as === 'span' ? motion.span : motion.div;
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
