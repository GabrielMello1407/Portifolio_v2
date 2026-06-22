'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useLanguage } from '@/i18n/LanguageContext';
import { projects, filters } from '@/data/projects';
import { cn } from '@/lib/utils';

export default function Projects() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState(null);

  const visible = projects.filter(
    (p) => active === 'all' || p.category.includes(active),
  );

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
              onClick={() => setActive(f.id)}
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

      {/* grade */}
      <motion.div
        layout
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div key={project.id} layout exit={{ opacity: 0, scale: 0.95 }}>
              <ProjectCard
                project={project}
                index={i}
                onOpen={() => setSelected(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
