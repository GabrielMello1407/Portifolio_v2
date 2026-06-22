'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDownToLine, Github, Linkedin, MapPin, MousePointer2 } from 'lucide-react';
import RotatingText from './ui/RotatingText';
import Magnetic from './ui/Magnetic';
import { useLanguage } from '@/i18n/LanguageContext';
import { resumeByLang } from '@/i18n/dictionary';
import { site } from '@/data/site';

const easing = [0.22, 1, 0.36, 1];

const floatBadges = [
  { label: { pt: 'Next.js', en: 'Next.js' }, className: '-left-4 top-8', delay: 0 },
  { label: { pt: 'TypeScript', en: 'TypeScript' }, className: 'right-0 top-1/3', delay: 0.6 },
  { label: { pt: 'Node.js', en: 'Node.js' }, className: 'left-2 bottom-10', delay: 1.1 },
  { label: { pt: 'IA / RAG', en: 'AI / RAG' }, className: '-right-2 bottom-20', delay: 1.6 },
];

export default function Hero() {
  const { t, tx, lang } = useLanguage();
  const sectionRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // reveal por caractere do nome
      const chars = nameRef.current?.querySelectorAll('[data-char]');
      if (chars?.length) {
        gsap.from(chars, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.04,
          delay: 0.15,
        });
      }
      // parallax no scroll
      gsap.to('.hero-photo', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-copy', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const name = 'Gabriel Mello';

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-36 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-44 lg:pb-28"
    >
      {/* Conteúdo */}
      <div className="hero-copy lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-fg-muted backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spark opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-spark" />
          </span>
          {t.hero.available}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: easing }}
          className="mt-6 font-mono text-sm text-fg-muted"
        >
          {t.hero.greeting}
        </motion.p>

        <h1
          ref={nameRef}
          className="mt-1 text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          aria-label={name}
        >
          <span aria-hidden="true" className="block overflow-hidden pb-1">
            {'Gabriel'.split('').map((c, i) => (
              <span key={i} data-char className="inline-block">{c}</span>
            ))}
          </span>
          <span aria-hidden="true" className="text-gradient block overflow-hidden pb-2">
            {'Mello'.split('').map((c, i) => (
              <span key={i} data-char className="inline-block">{c}</span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: easing }}
          className="mt-5 flex min-h-8 items-center text-sm font-medium text-fg sm:text-xl lg:text-2xl"
        >
          <span className="mr-2 font-mono text-accent-300">~$</span>
          <RotatingText phrases={t.hero.roles} className="font-mono" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26, ease: easing }}
          className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          {t.hero.lead}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-3 font-mono text-xs text-fg-subtle"
        >
          <span className="text-accent-300">{'// '}</span>
          {lang === 'pt'
            ? 'atualmente: FlunexApp + ferramentas de IA na UENP'
            : 'currently: FlunexApp + AI tooling at UENP'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: easing }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/25 transition-shadow hover:shadow-xl hover:shadow-accent-600/40"
            >
              {t.hero.ctaWork}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <a
            href={resumeByLang[lang]}
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-fg backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            <ArrowDownToLine className="h-4 w-4" />
            {t.hero.ctaResume}
          </a>

          <div className="ml-1 flex items-center gap-1">
            <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-colors hover:border-white/25 hover:text-fg">
              <Github className="h-5 w-5" />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-colors hover:border-white/25 hover:text-fg">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-7 flex items-center gap-4 text-sm text-fg-subtle"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {t.hero.basedIn}
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <MousePointer2 className="h-3.5 w-3.5" />
            {t.hero.scroll}
          </span>
        </motion.div>
      </div>

      {/* Foto */}
      <div className="lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: easing }}
          className="hero-photo relative mx-auto aspect-square w-[18rem] sm:w-[22rem] lg:w-[25rem]"
        >
          <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,var(--color-accent-600),transparent_65%)] opacity-50 blur-2xl" />
          <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-500),var(--color-accent-400),var(--color-accent-600),var(--color-accent-500))] opacity-70 [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />

          <div className="absolute inset-[10px] overflow-hidden rounded-full border border-white/10 bg-ink-850">
            <Image
              src="/images/eu.png"
              alt="Gabriel Mello"
              fill
              priority
              sizes="(max-width: 1024px) 22rem, 25rem"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
          </div>

          {floatBadges.map((b) => (
            <span
              key={b.label.en}
              className={`animate-float absolute ${b.className} rounded-full border border-white/10 bg-ink-900 px-3 py-1.5 font-mono text-xs text-fg-muted shadow-lg`}
              style={{ animationDelay: `${b.delay}s` }}
            >
              {tx(b.label)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
