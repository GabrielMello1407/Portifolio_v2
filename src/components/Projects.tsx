'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useLanguage } from '@/i18n/LanguageContext';
import { projects, filters } from '@/data/projects';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type WithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

export default function Projects() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = projects.filter(
    (p) => active === 'all' || p.category.includes(active),
  );

  // troca de filtro com View Transitions (cards morfam de posição); fallback
  // direto onde não houver suporte ou com prefers-reduced-motion.
  const changeFilter = (id: string) => {
    if (id === active) return;
    const doc = document as WithVT;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduced) {
      doc.startViewTransition(() => flushSync(() => setActive(id)));
    } else {
      setActive(id);
    }
  };

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={t.projects.heading}
        subtitle={t.projects.lead}
        index="01"
        className="mb-10"
      />

      {/* filtros */}
      <div
        role="group"
        aria-label={t.projects.eyebrow}
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => changeFilter(f.id)}
              aria-pressed={isActive}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive ? 'text-ink-950' : 'text-fg-muted hover:text-fg',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-300 to-accent-200"
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
              )}
              {f[lang]}
            </button>
          );
        })}
      </div>

      {/* grade — cada card tem view-transition-name, então a troca de filtro
          morfa as posições (cards que ficam deslizam; os que saem/entram fazem
          fade). O Reveal cuida da entrada coletiva ao rolar até a seção. */}
      <Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
