'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Code2, Server, Database, Sparkles, Cloud, ShieldCheck, Smartphone,
  GraduationCap, Award, Languages, Check,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const skillGroups = [
  { key: 'frontend', icon: Code2, items: ['React', 'Next.js', 'TypeScript', 'Angular', 'Tailwind CSS', 'ShadCN UI', 'TanStack Query', 'Zustand', 'Framer Motion'] },
  { key: 'backend', icon: Server, items: ['Node.js (Express)', 'Python (Django)', 'REST APIs', 'Auth / RBAC', 'Webhooks (HMAC)', 'Background jobs'] },
  { key: 'data', icon: Database, items: ['PostgreSQL', 'MySQL', 'Redis (cache + pub/sub)'] },
  { key: 'ai', icon: Sparkles, items: ['Gemini', 'Claude', 'GPT-4', 'Groq', 'RAG', 'Prompt Engineering', 'Agent validation'] },
  { key: 'cloud', icon: Cloud, items: ['AWS (EC2, RDS, VPC, S3, IAM)', 'Docker', 'CI/CD', 'Grafana', 'Git / GitHub', 'Scrum / Jira'] },
  { key: 'quality', icon: ShieldCheck, items: ['Jest', 'Testing Library', 'Zod', 'TypeScript strict', 'ESLint', 'Code review'] },
  { key: 'mobile', icon: Smartphone, items: ['React Native', 'Kotlin', 'GeckoView'] },
];

export default function About() {
  const { t } = useLanguage();
  const tabs = [
    { id: 'skills', label: t.about.tabs.skills },
    { id: 'experience', label: t.about.tabs.experience },
    { id: 'education', label: t.about.tabs.education },
  ];
  const [tab, setTab] = useState('skills');

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.heading} index="02" className="mb-12" />

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        {/* bio + strengths */}
        <Reveal className="lg:col-span-2">
          <div className="space-y-4 text-base leading-relaxed text-fg-muted">
            <p>{t.about.bio1}</p>
            <p>{t.about.bio2}</p>
          </div>

          <div className="mt-8">
            <p className="mb-3 label-mono text-xs text-accent-300">{t.strengths.title}</p>
            <ul className="space-y-3">
              {t.strengths.items.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark" />
                  <span className="text-sm text-fg-muted">
                    <span className="font-semibold text-fg">{s.title}</span> — {s.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* tabs */}
        <Reveal className="lg:col-span-3" delay={0.1}>
          <div role="tablist" aria-label={t.about.heading} className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                role="tab"
                aria-selected={tab === tb.id}
                onClick={() => setTab(tb.id)}
                className={cn(
                  'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  tab === tb.id ? 'text-ink-950' : 'text-fg-muted hover:text-fg',
                )}
              >
                {tab === tb.id && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-300 to-accent-200"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {tb.label}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[20rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {tab === 'skills' && (
                  <div className="space-y-5">
                    {skillGroups.map((g) => {
                      const Icon = g.icon;
                      return (
                        <div key={g.key}>
                          <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-fg">
                            <Icon className="h-4 w-4 text-accent-300" />
                            {t.skills[g.key]}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {g.items.map((s) => (
                              <span
                                key={s}
                                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent-300/40 hover:text-fg"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {tab === 'experience' && (
                  <ol className="relative space-y-7 border-l border-white/10 pl-6">
                    {t.about.experienceItems.map((exp, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[1.65rem] top-1 grid h-3 w-3 place-items-center">
                          <span className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-300 to-accent-200 ring-4 ring-ink-950" />
                        </span>
                        <span className="font-mono text-xs text-accent-300">{exp.period}</span>
                        <h4 className="mt-1 font-display text-base font-semibold text-fg">{exp.title}</h4>
                        <p className="mt-0.5 text-xs text-fg-subtle">{exp.place}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{exp.text}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {tab === 'education' && (
                  <div className="space-y-8">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                        <GraduationCap className="h-4 w-4 text-accent-300" />
                        {t.about.educationTitle}
                      </div>
                      <ul className="space-y-3">
                        {t.about.education.map((e, i) => (
                          <li key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                            <p className="text-sm font-semibold text-fg">{e.title}</p>
                            <p className="mt-0.5 text-xs text-fg-muted">
                              {e.place}{e.period && ` · ${e.period}`}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                        <Award className="h-4 w-4 text-accent-300" />
                        {t.about.certsTitle}
                      </div>
                      <ul className="space-y-2">
                        {t.about.certs.map((c, i) => (
                          <li key={i} className="flex gap-2 text-sm text-fg-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-300" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                        <Languages className="h-4 w-4 text-accent-300" />
                        {t.about.languagesTitle}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {t.about.languages.map((l) => (
                          <div key={l.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                            <p className="text-sm font-semibold text-fg">{l.label}</p>
                            <p className="mt-0.5 text-xs text-fg-muted">{l.level}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
