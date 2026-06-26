'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Github, Lock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import type { Project, ProjectStatus } from '@/types';

const gradients = [
  'from-accent-500/30 via-accent-600/10',
  'from-accent-400/30 via-accent-500/10',
  'from-emerald-400/25 via-accent-400/10',
  'from-teal-400/30 via-accent-600/10',
  'from-accent-200/25 via-accent-500/10',
  'from-cyan-400/25 via-accent-400/10',
];

const statusColor: Record<ProjectStatus, string> = {
  production: 'bg-emerald-400',
  development: 'bg-amber-400',
  volunteer: 'bg-spark',
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { t, tx } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * 7);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const name = tx(project.name);
  const thumb = project.images?.[0];
  const hasLinks = project.liveUrl || project.repoUrl;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, viewTransitionName: `p-${project.id}` }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 transition-colors duration-300 hover:border-white/20"
    >
      {/* spotlight no hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(380px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent-500) 14%, transparent), transparent 65%)',
        }}
      />

      {/* header: screenshot real OU gradiente abstrato */}
      <div className="relative h-36 overflow-hidden">
        {thumb ? (
          <>
            <Image
              src={thumb}
              alt=""
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          </>
        ) : (
          <div className={cn('absolute inset-0 bg-gradient-to-br to-transparent', gradients[index % gradients.length])}>
            <div className="grid-bg absolute inset-0 opacity-30" />
            <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-bold leading-none text-white/[0.06]">
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* logo do projeto */}
        {project.logo && (
          <span className="absolute left-3 top-3 z-10 grid h-9 place-items-center rounded-lg border border-white/10 bg-ink-950/85 px-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.logo} alt={`${name} logo`} className="h-5 w-auto object-contain" />
          </span>
        )}

        {/* badges */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 p-3">
          <span className="rounded-full border border-white/15 bg-ink-950/85 px-2.5 py-1 label-mono text-[10px] text-fg-muted">
            {tx(project.role)}
          </span>
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/85 px-2.5 py-1 text-[10px] font-medium text-fg-muted">
              <span className={cn('h-1.5 w-1.5 rounded-full', statusColor[project.status])} />
              {t.projects.status[project.status]}
            </span>
          )}
        </div>
      </div>

      {/* corpo */}
      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight text-fg">{name}</h3>
          <span className="shrink-0 pt-1 font-mono text-xs text-fg-muted">{tx(project.year)}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-accent-300">{tx(project.tagline)}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-muted">{tx(project.description)}</p>

        {/* stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-fg-muted">
              {tech}
            </span>
          ))}
        </div>

        {/* ações */}
        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:bg-white/[0.12]"
            >
              {t.projects.live}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
            >
              <Github className="h-3.5 w-3.5" />
              {t.projects.code}
            </a>
          )}
          {!hasLinks && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-fg-muted">
              <Lock className="h-3.5 w-3.5" />
              {t.projects.noLinks}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-300 transition-colors hover:text-accent-200"
          >
            {t.projects.details}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
