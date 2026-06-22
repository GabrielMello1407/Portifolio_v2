'use client';

import { useEffect, useState } from 'react';
import { Github, ArrowUpRight, GitBranch, Users, Flame } from 'lucide-react';
import Reveal from './ui/Reveal';
import { useLanguage } from '@/i18n/LanguageContext';

const LEVEL = ['rgba(255,255,255,0.06)', '#115e59', '#0d9488', '#14b8a6', '#34d399'];

function toWeeks(contributions) {
  const weeks = [];
  let week = new Array(7).fill(null);
  contributions.forEach((d) => {
    const day = new Date(d.date).getDay(); // 0 (dom) .. 6 (sáb)
    week[day] = d;
    if (day === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
  });
  if (week.some(Boolean)) weeks.push(week);
  return weeks;
}

export default function GitHubActivity() {
  const { lang } = useLanguage();
  const pt = lang === 'pt';
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (d?.ok) setData(d);
        else setFailed(true);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  if (failed) return null; // degrada sem quebrar

  const weeks = data ? toWeeks(data.contributions) : [];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
      <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-mono mb-2 text-xs text-accent-300">git log --author=gabriel</p>
            <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              {data ? (
                <>
                  <span className="text-gradient">{data.total.toLocaleString(pt ? 'pt-BR' : 'en-US')}</span>{' '}
                  {pt ? 'contribuições no último ano' : 'contributions in the last year'}
                </>
              ) : pt ? 'Carregando atividade…' : 'Loading activity…'}
            </h3>
          </div>
          <a
            href={data?.profile || 'https://github.com/GabrielMello1407'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
          >
            <Github className="h-4 w-4" />
            @GabrielMello1407
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* stats */}
        {data && (
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-spark" />
              {data.total} {pt ? 'commits' : 'commits'}
            </span>
            {data.repos != null && (
              <span className="inline-flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5 text-accent-300" />
                {data.repos} {pt ? 'repositórios públicos' : 'public repos'}
              </span>
            )}
            {data.followers != null && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-accent-300" />
                {data.followers} followers
              </span>
            )}
          </div>
        )}

        {/* heatmap */}
        <div className="edge-fade-x mt-6 overflow-x-auto pb-1">
          <div className="flex gap-[3px]" style={{ minWidth: 'max-content' }}>
            {data
              ? weeks.map((w, i) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    {w.map((d, j) => (
                      <span
                        key={j}
                        title={d ? `${d.date}: ${d.count}` : ''}
                        className="h-[11px] w-[11px] rounded-[2px]"
                        style={{ background: d ? LEVEL[d.level] : 'transparent' }}
                      />
                    ))}
                  </div>
                ))
              : Array.from({ length: 52 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((__, j) => (
                      <span key={j} className="h-[11px] w-[11px] animate-pulse rounded-[2px] bg-white/[0.04]" />
                    ))}
                  </div>
                ))}
          </div>
        </div>

        {/* legenda */}
        {data && (
          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-fg-subtle">
            {pt ? 'menos' : 'less'}
            {LEVEL.map((c, i) => (
              <span key={i} className="h-[11px] w-[11px] rounded-[2px]" style={{ background: c }} />
            ))}
            {pt ? 'mais' : 'more'}
          </div>
        )}
      </Reveal>
    </section>
  );
}
