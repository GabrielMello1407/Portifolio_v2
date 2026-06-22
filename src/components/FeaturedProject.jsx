'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import Counter from './ui/Counter';
import FlunexMockup from './FlunexMockup';
import BrowserFrame from './ui/BrowserFrame';
import ArchitectureDiagram from './ui/ArchitectureDiagram';
import { useLanguage } from '@/i18n/LanguageContext';
import { featured } from '@/data/projects';

export default function FeaturedProject() {
  const { t, tx } = useLanguage();

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
      <SectionHeading
        eyebrow={t.featured.eyebrow}
        title={t.featured.heading}
        align="center"
        className="mb-12"
      />

      <Reveal>
        <div className="group card-glow relative overflow-hidden rounded-3xl border border-accent-500/20 bg-white/[0.02] p-1 shadow-2xl shadow-accent-600/10">
          {/* aura em gradiente — estática (perf), intensifica no hover */}
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_top,var(--color-accent-500),transparent_60%)] opacity-20 blur-2xl transition-opacity duration-700 group-hover:opacity-40" />

          <div className="relative rounded-[1.25rem] bg-ink-900/80 p-6 sm:p-8 lg:p-10">
            {/* topo: marca + CTA */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={featured.logo}
                  alt="FlunexApp"
                  width={52}
                  height={52}
                  className="h-13 w-13 rounded-2xl"
                />
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {featured.name}
                  </h3>
                  <p className="text-sm text-fg-muted">{tx(featured.tagline)}</p>
                </div>
              </div>

              <a
                href={featured.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group/cta inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-transform hover:scale-[1.03] sm:self-auto"
              >
                {t.featured.visit}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </a>
            </div>

            {/* meta */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-fg-subtle">
              <span className="inline-flex items-center gap-1.5 text-spark">
                <Sparkles className="h-3.5 w-3.5" />
                {tx(featured.role)}
              </span>
              <span className="h-1 w-1 rounded-full bg-fg-subtle/50" />
              <span>{tx(featured.year)}</span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
              {/* esquerda: resumo + highlights */}
              <div>
                <p className="text-base leading-relaxed text-fg-muted">
                  {tx(featured.summary)}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {featured.highlights.map((h) => (
                    <div
                      key={tx(h.title)}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-accent-300/30 hover:bg-white/[0.04]"
                    >
                      <h4 className="font-display text-sm font-semibold text-fg">
                        {tx(h.title)}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                        {tx(h.text)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* direita: screenshot real (fallback: mockup animado) + stats */}
              <div className="flex flex-col gap-6">
                {featured.images?.[0] ? (
                  <BrowserFrame
                    src={featured.images[0]}
                    alt="FlunexApp — landing"
                    url="flunexapp.com"
                  />
                ) : (
                  <FlunexMockup />
                )}

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {featured.stats.map((s) => (
                    <div
                      key={tx(s.label)}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center"
                    >
                      <div className="text-gradient font-display text-2xl font-bold">
                        <Counter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-fg-muted">
                        {tx(s.label)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* arquitetura */}
            {featured.architecture && (
              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="mb-3 label-mono text-xs text-fg-subtle">
                  {t.projects.architectureTitle}
                </p>
                <ArchitectureDiagram
                  layers={featured.architecture.map((l) => ({ title: tx(l.title), nodes: l.nodes }))}
                />
              </div>
            )}

            {/* stack */}
            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                {t.featured.builtWith}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
