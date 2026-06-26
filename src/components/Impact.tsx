'use client';

import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';
import { impact } from '@/data/impact';

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Impact() {
  const { t, tx } = useLanguage();

  return (
    <section id="impact" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-24">
      <SectionHeading eyebrow={t.impact.eyebrow} title={t.impact.heading} subtitle={t.impact.lead} className="mb-12" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {impact.map((m, i) => (
          <motion.div
            key={m.project}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, ease: easing, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40 p-6 transition-colors hover:border-white/20"
          >
            <div className="pointer-events-none absolute -right-6 -top-10 h-28 w-28 rounded-full bg-accent-500/10 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <span className="label-mono text-[11px] text-accent-300">{m.project}</span>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight text-gradient">{m.big}</span>
              <span className="text-sm font-medium text-fg-muted">{tx(m.unit)}</span>
            </div>
            <p className="mt-1.5 text-sm leading-snug text-fg-muted">{tx(m.label)}</p>

            {/* antes / depois */}
            <div className="mt-5 space-y-2.5">
              <Bar label={t.impact.before} value={tx(m.before)} pct={100} tone="muted" delay={i * 0.08} />
              <Bar label={t.impact.after} value={tx(m.after)} pct={m.afterPct} tone="accent" delay={i * 0.08 + 0.15} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Bar({ label, value, pct, tone, delay }: { label: string; value: string; pct: number; tone: 'muted' | 'accent'; delay: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="label-mono text-[10px] text-fg-subtle">{label}</span>
        <span className={tone === 'accent' ? 'font-semibold text-accent-200' : 'text-fg-muted'}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(pct, 3)}%` }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: easing, delay }}
          className={
            tone === 'accent'
              ? 'h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-300'
              : 'h-full rounded-full bg-white/15'
          }
        />
      </div>
    </div>
  );
}
