'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Rocket, type LucideIcon } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';
import { journey, type JourneyType } from '@/data/journey';
import { cn } from '@/lib/utils';

const typeMeta: Record<
  JourneyType,
  { Icon: LucideIcon; dot: string; text: string; label: { pt: string; en: string } }
> = {
  education: { Icon: GraduationCap, dot: 'bg-sky-400', text: 'text-sky-300', label: { pt: 'Formação', en: 'Education' } },
  role: { Icon: Briefcase, dot: 'bg-accent-400', text: 'text-accent-300', label: { pt: 'Carreira', en: 'Career' } },
  system: { Icon: Rocket, dot: 'bg-spark', text: 'text-spark', label: { pt: 'Sistema', en: 'System' } },
};

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Journey() {
  const { t, tx } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.height = '100%'; // linha desenhada estática
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 60%', end: 'bottom 75%', scrub: true },
        },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={t.journey.eyebrow} title={t.journey.heading} subtitle={t.journey.lead} index="03" className="mb-14" />

      <div ref={wrapRef} className="relative">
        {/* trilho base */}
        <div className="pointer-events-none absolute inset-y-0 left-[19px] w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />
        {/* linha que desenha no scroll, com marcador na ponta */}
        <div
          ref={fillRef}
          style={{ height: '0%' }}
          className="pointer-events-none absolute left-[19px] top-0 w-px bg-gradient-to-b from-accent-300 via-accent-400 to-accent-500 lg:left-1/2 lg:-translate-x-1/2"
        >
          <span className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-200 shadow-[0_0_14px_3px_rgba(45,212,191,0.55)]" />
        </div>

        <ol className="space-y-9 lg:space-y-14">
          {journey.map((m, i) => {
            const meta = typeMeta[m.type];
            const { Icon } = meta;
            const left = i % 2 === 0; // alterna lados no desktop

            return (
              <motion.li
                key={`${m.year}-${tx(m.title)}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.6, ease: easing }}
                className="relative"
              >
                {/* nó na trilha */}
                <span className="absolute left-[19px] top-1 z-10 -translate-x-1/2 lg:left-1/2">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-900 ring-4 ring-ink-950">
                    <Icon className={cn('h-[18px] w-[18px]', meta.text)} />
                  </span>
                </span>

                {/* card */}
                <div className={cn('pl-16 lg:w-1/2 lg:pl-0', left ? 'lg:pr-14 lg:text-right' : 'lg:ml-auto lg:pl-14')}>
                  <div className="group rounded-2xl border border-white/10 bg-ink-900/40 p-5 transition-colors hover:border-white/20">
                    <div className={cn('flex items-center gap-2', left && 'lg:justify-end')}>
                      <span className="font-mono text-xs text-accent-300">{m.year}</span>
                      <span className="inline-flex items-center gap-1.5 label-mono text-[10px] text-fg-subtle">
                        <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
                        {tx(meta.label)}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-fg">{tx(m.title)}</h3>
                    {m.org && <p className="mt-0.5 text-xs text-fg-subtle">{tx(m.org)}</p>}
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{tx(m.text)}</p>
                    {m.tags && (
                      <div className={cn('mt-3 flex flex-wrap gap-1.5', left && 'lg:justify-end')}>
                        {m.tags.map((tag) => (
                          <span key={tag} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-fg-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
