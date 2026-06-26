'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, Github, Lock, Check } from 'lucide-react';
import ArchitectureDiagram from './ui/ArchitectureDiagram';
import { useLanguage } from '@/i18n/LanguageContext';
import { useFocusTrap } from '@/lib/use-focus-trap';
import { cn } from '@/lib/utils';
import type { Project, ProjectStatus, Bilingual, ArchitectureLayer } from '@/types';

const statusColor: Record<ProjectStatus, string> = {
  production: 'bg-emerald-400',
  development: 'bg-amber-400',
  volunteer: 'bg-spark',
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, tx } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  useFocusTrap(dialogRef, !lightbox);
  useFocusTrap(lightboxRef, !!lightbox);

  // captura quem abriu o modal e devolve o foco ao fechar (componente desmonta)
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    return () => {
      if (openerRef.current?.isConnected) openerRef.current.focus();
    };
  }, []);

  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    lenis?.stop?.();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (lightbox ? lightboxCloseRef : closeRef).current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (lightbox) setLightbox(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start?.();
    };
  }, [onClose, lightbox]);

  const name = tx(project.name);
  const features = project.details?.features ?? [];
  const images = project.images ?? [];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pointer-events-none fixed inset-0 bg-ink-950/80 backdrop-blur-sm" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={name}
        data-lenis-prevent
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass card-glow relative z-10 my-8 w-full max-w-3xl rounded-3xl border border-accent-500/20 p-6 sm:p-8"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={t.projects.close}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-fg-muted transition-colors hover:text-fg"
        >
          <X className="h-5 w-5" />
        </button>

        {/* header */}
        <div className="pr-10">
          <div className="flex items-center gap-3">
            {project.logo && (
              <span className="grid h-11 place-items-center rounded-xl border border-white/10 bg-ink-950/70 px-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.logo} alt={`${name} logo`} className="h-6 w-auto object-contain" />
              </span>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {project.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-fg-muted">
                  <span className={cn('h-1.5 w-1.5 rounded-full', statusColor[project.status])} />
                  {t.projects.status[project.status]}
                </span>
              )}
              <span className="font-mono text-xs text-fg-subtle">{tx(project.year)}</span>
              <span className="font-mono text-xs text-accent-300">· {tx(project.role)}</span>
            </div>
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">{name}</h3>
          <p className="mt-1 text-accent-300">{tx(project.tagline)}</p>
        </div>

        {/* links */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="btn-primary group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm">
              {t.projects.live}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg">
              <Github className="h-4 w-4" />{t.projects.code}
            </a>
          )}
          {!project.liveUrl && !project.repoUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-fg-subtle">
              <Lock className="h-4 w-4" />{t.projects.noLinks}
            </span>
          )}
        </div>

        {/* overview */}
        <div className="mt-7">
          <p className="mb-2 label-mono text-xs text-accent-300">{t.projects.overviewTitle}</p>
          <p className="text-sm leading-relaxed text-fg-muted">
            {tx(project.details?.overview) || tx(project.description)}
          </p>
        </div>

        {/* features */}
        {features.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 label-mono text-xs text-accent-300">{t.projects.featuresTitle}</p>
            <ul className="space-y-2.5">
              {features.map((f, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                  {tx(f)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* arquitetura */}
        {project.architecture && (
          <div className="mt-6">
            <p className="mb-3 label-mono text-xs text-accent-300">{t.projects.architectureTitle}</p>
            <ArchitectureDiagram
              layers={project.architecture.map((l) => ({ title: tx(l.title), nodes: l.nodes }))}
            />
          </div>
        )}

        {/* galeria (só aparece se houver imagens) */}
        {images.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 label-mono text-xs text-accent-300">{t.projects.galleryTitle}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(src)}
                  aria-label={`${name} — ${i + 1}`}
                  className="group/img relative overflow-hidden rounded-xl border border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${name} — ${i + 1}`}
                    loading="lazy"
                    className="w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover/img:scale-[1.04]"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* stack */}
        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="mb-3 label-mono text-xs text-fg-subtle">{t.projects.stackTitle}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-fg-muted">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={name}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/95 p-4"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setLightbox(null)}
          >
            <button
              ref={lightboxCloseRef}
              type="button"
              onClick={() => setLightbox(null)}
              aria-label={t.projects.close}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-fg"
            >
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={lightbox}
              alt={name}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[92vw] rounded-xl border border-white/10 object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
