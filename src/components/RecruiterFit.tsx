'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface Parsed {
  score: number | null;
  body: string;
}

function parse(text: string): Parsed {
  const m = text.match(/FIT:\s*(\d{1,3})/i);
  const score = m ? Math.min(100, Math.max(0, parseInt(m[1], 10))) : null;
  // remove a linha do FIT: do corpo exibido
  const body = text.replace(/^.*FIT:\s*[^\n]*\n?/i, '').trim();
  return { score, body };
}

function scoreColor(n: number): { bar: string; text: string } {
  if (n >= 75) return { bar: 'from-emerald-400 to-accent-300', text: 'text-emerald-300' };
  if (n >= 50) return { bar: 'from-amber-400 to-yellow-300', text: 'text-amber-300' };
  return { bar: 'from-rose-400 to-amber-400', text: 'text-rose-300' };
}

/** Conta de 0 até `to` quando `run` vira true. */
function useCountUp(to: number | null, run: boolean) {
  const [n, setN] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!run || to == null) {
      setN(0);
      return;
    }
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, run]);
  return n;
}

function AnalysisBody({ text }: { text: string }) {
  return (
    <div className="space-y-1.5 text-sm leading-relaxed text-fg-muted">
      {text.split('\n').map((line, i) => {
        const l = line.trim();
        if (!l) return <div key={i} className="h-1" />;
        const isHeader = /^(✅|⚠️|💬)/.test(l);
        const isBullet = /^[-•]\s/.test(l);
        if (isHeader) {
          return (
            <p key={i} className="mt-3 font-semibold text-fg">
              {l}
            </p>
          );
        }
        if (isBullet) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-300" />
              <span>{l.replace(/^[-•]\s/, '')}</span>
            </div>
          );
        }
        return <p key={i}>{l}</p>;
      })}
    </div>
  );
}

export default function RecruiterFit() {
  const { t } = useLanguage();
  const r = t.recruiterFit;
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Parsed | null>(null);
  const [error, setError] = useState<string | null>(null);

  const count = useCountUp(result?.score ?? null, !!result);

  const analyze = async () => {
    if (jd.trim().length < 40 || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd: jd.slice(0, 6000) }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 400) {
        setError(r.short);
        return;
      }
      if (res.status === 429) {
        setError(data?.message || r.error);
        return;
      }
      if (!res.ok || !data?.text) {
        setError(r.error);
        return;
      }
      setResult(parse(data.text));
    } catch {
      setError(r.error);
    } finally {
      setLoading(false);
    }
  };

  const color = result?.score != null ? scoreColor(result.score) : null;

  return (
    <section id="fit" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={r.eyebrow} title={r.heading} subtitle={r.lead} index="04" className="mb-12" />

      <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* entrada */}
        <div className="flex flex-col">
          <label htmlFor="jd" className="sr-only">
            {r.placeholder}
          </label>
          <textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder={r.placeholder}
            rows={9}
            maxLength={6000}
            data-lenis-prevent
            className="min-h-[14rem] flex-1 resize-none rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3 text-sm leading-relaxed text-fg placeholder-fg-subtle outline-none transition-colors focus:border-accent-300/60 focus:ring-2 focus:ring-accent-300/20"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-1.5 text-xs text-fg-subtle">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-300" />
              {r.privacy}
            </p>
            <button
              type="button"
              onClick={analyze}
              disabled={jd.trim().length < 40 || loading}
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {r.analyzing}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {r.button}
                </>
              )}
            </button>
          </div>
          {jd.trim().length > 0 && jd.trim().length < 40 && (
            <p className="mt-2 text-xs text-amber-300/80">
              {r.short} <span className="text-fg-subtle">({jd.trim().length}/40)</span>
            </p>
          )}
        </div>

        {/* resultado */}
        <div aria-live="polite" aria-busy={loading} className="glass card-glow min-h-[14rem] rounded-2xl border border-white/10 p-6">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid h-full place-items-center text-sm text-fg-subtle">
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-accent-300" />
                  {r.analyzing}
                </span>
              </motion.div>
            )}

            {!loading && error && (
              <motion.p key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-fg-muted">
                {error}
              </motion.p>
            )}

            {!loading && !error && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {result.score != null && color && (
                  <div className="mb-5">
                    <div className="flex items-end justify-between">
                      <span className="label-mono text-xs text-fg-subtle">{r.scoreLabel}</span>
                      <span className={cn('font-display text-3xl font-bold tabular-nums', color.text)}>{count}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className={cn('h-full rounded-full bg-gradient-to-r', color.bar)}
                      />
                    </div>
                  </div>
                )}
                <AnalysisBody text={result.body} />
              </motion.div>
            )}

            {!loading && !error && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid h-full place-items-center text-center text-sm text-fg-subtle">
                <span className="inline-flex items-center gap-2">
                  <ArrowRight className="hidden h-4 w-4 lg:inline" />
                  {r.hint}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
