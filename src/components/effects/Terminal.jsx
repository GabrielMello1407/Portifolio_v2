'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { resumeByLang } from '@/i18n/dictionary';
import { site } from '@/data/site';
import { markSecret, getSecrets, TOTAL_SECRETS } from '@/lib/secrets';

function scrollTo(sel) {
  const el = sel === '#top' ? document.body : document.querySelector(sel);
  if (!el) return;
  if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Terminal() {
  const { lang } = useLanguage();
  const pt = lang === 'pt';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const banner = pt
    ? ["Bem-vindo ao terminal do Gabriel.", "Digite 'help' para ver os comandos. (Esc para sair)"]
    : ["Welcome to Gabriel's terminal.", "Type 'help' to see commands. (Esc to close)"];

  // abrir: "/" ou Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // abrir via botão da navbar (evento)
  useEffect(() => {
    const open = () => setOpen(true);
    window.addEventListener('open-terminal', open);
    return () => window.removeEventListener('open-terminal', open);
  }, []);

  // ao abrir
  useEffect(() => {
    if (!open) return;
    markSecret('terminal');
    if (lines.length === 0) setLines(banner.map((t) => ({ k: 'sys', c: t })));
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    const lenis = window.__lenis;
    lenis?.stop?.();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(id);
      lenis?.start?.();
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines]);

  const print = (arr) => setLines((l) => [...l, ...arr]);

  const COMMANDS = pt
    ? {
        help: 'lista os comandos',
        about: 'quem é o Gabriel',
        projects: 'ir para os projetos',
        skills: 'minhas tecnologias',
        experience: 'minha experiência',
        contact: 'ir para o contato',
        resume: 'baixar o currículo',
        social: 'github / linkedin',
        secrets: `segredos encontrados (de ${TOTAL_SECRETS})`,
        gm: 'diga olá ☀️',
        clear: 'limpa a tela',
        exit: 'fecha o terminal',
      }
    : {
        help: 'list commands',
        about: 'who is Gabriel',
        projects: 'jump to projects',
        skills: 'my tech stack',
        experience: 'my experience',
        contact: 'jump to contact',
        resume: 'download resume',
        social: 'github / linkedin',
        secrets: `secrets found (of ${TOTAL_SECRETS})`,
        gm: 'say hi ☀️',
        clear: 'clear the screen',
        exit: 'close the terminal',
      };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    print([{ k: 'in', c: raw }]);
    setHistory((h) => [...h, raw]);
    setHIdx(-1);

    const out = (txt) => print(Array.isArray(txt) ? txt.map((c) => ({ k: 'out', c })) : [{ k: 'out', c: txt }]);

    if (cmd === 'help' || cmd === '?') {
      out(Object.entries(COMMANDS).map(([k, v]) => `  ${k.padEnd(11)} ${v}`));
    } else if (cmd === 'about' || cmd === 'whoami') {
      out(pt
        ? 'Engenheiro de software full-stack. SaaS, IA aplicada e sistemas que precisam funcionar em produção.'
        : 'Full-stack software engineer. SaaS, applied AI and systems that have to work in production.');
    } else if (cmd === 'projects' || cmd === 'work' || cmd === 'ls') {
      out(pt ? 'abrindo projetos…' : 'opening projects…');
      setOpen(false);
      setTimeout(() => scrollTo('#projects'), 150);
    } else if (cmd === 'about-me') {
      setOpen(false);
      setTimeout(() => scrollTo('#about'), 150);
    } else if (cmd === 'contact') {
      out(pt ? 'vamos conversar →' : "let's talk →");
      setOpen(false);
      setTimeout(() => scrollTo('#contact'), 150);
    } else if (cmd === 'skills' || cmd === 'stack') {
      out(['React · Next.js · TypeScript · Node.js · Python',
        'Prisma · PostgreSQL · Redis · BullMQ · Docker · AWS',
        'IA: Gemini · Claude · Groq · RAG · LiteLLM']);
    } else if (cmd === 'experience') {
      out(['UENP — Developer Analyst (2025→)',
        'FlunexApp — Founder & Lead Engineer (2025→)']);
    } else if (cmd === 'resume' || cmd === 'cv') {
      out(pt ? 'baixando currículo…' : 'downloading resume…');
      const a = document.createElement('a');
      a.href = resumeByLang[lang];
      a.download = '';
      a.click();
    } else if (cmd === 'social' || cmd === 'links') {
      print([
        { k: 'link', c: 'GitHub', href: site.socials.github },
        { k: 'link', c: 'LinkedIn', href: site.socials.linkedin },
        { k: 'link', c: site.email, href: `mailto:${site.email}` },
      ]);
    } else if (cmd === 'gm') {
      markSecret('gm');
      out('gm ☀️');
    } else if (cmd === 'secrets') {
      const n = getSecrets().length;
      out(n >= TOTAL_SECRETS
        ? (pt ? `🏆 ${n}/${TOTAL_SECRETS} — você achou todos! lendário.` : `🏆 ${n}/${TOTAL_SECRETS} — you found them all! legendary.`)
        : (pt ? `🔓 ${n}/${TOTAL_SECRETS} segredos. continue procurando 👀` : `🔓 ${n}/${TOTAL_SECRETS} secrets. keep looking 👀`));
    } else if (cmd === 'sudo hire-me' || cmd === 'sudo' || cmd === 'hire-me' || cmd === 'hire') {
      markSecret('sudo');
      out(pt ? '🔓 permissão concedida. abrindo seu cliente de email…' : '🔓 permission granted. opening your email client…');
      setTimeout(() => {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(pt ? 'Vamos trabalhar juntos' : "Let's work together")}`;
      }, 900);
    } else if (cmd === 'xyzzy') {
      out(pt ? 'Nada acontece. ...ou será? 😏' : 'Nothing happens. ...or does it? 😏');
    } else if (cmd === 'theme') {
      out(pt ? 'dark mode only. é uma vibe. 😎' : 'dark mode only. it is a vibe. 😎');
    } else if (cmd === 'clear' || cmd === 'cls') {
      setLines([]);
    } else if (cmd === 'exit' || cmd === 'quit' || cmd === 'close') {
      setOpen(false);
    } else {
      out(pt ? `comando não encontrado: ${cmd} — tente 'help'` : `command not found: ${cmd} — try 'help'`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    run(input);
    setInput('');
  };

  const onInputKey = (e) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const i = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setInput(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < 0) return;
      const i = hIdx + 1;
      if (i >= history.length) { setHIdx(-1); setInput(''); }
      else { setHIdx(i); setInput(history[i]); }
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] flex items-start justify-center p-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div className="pointer-events-none fixed inset-0 bg-ink-950/70 backdrop-blur-sm" />
            <motion.div
              role="dialog"
              aria-label="Terminal"
              data-lenis-prevent
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="glass card-glow relative z-10 flex h-[58vh] max-h-[440px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-accent-500/20"
            >
              {/* topo */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono text-xs text-fg-subtle">gabriel@portfolio:~</span>
                <button onClick={() => setOpen(false)} aria-label="close" className="ml-auto text-fg-subtle hover:text-fg">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* corpo */}
              <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed">
                {lines.map((ln, i) => {
                  if (ln.k === 'in')
                    return (
                      <div key={i} className="text-fg">
                        <span className="text-accent-300">❯</span> {ln.c}
                      </div>
                    );
                  if (ln.k === 'sys') return <div key={i} className="text-fg-subtle">{ln.c}</div>;
                  if (ln.k === 'link')
                    return (
                      <div key={i}>
                        <a href={ln.href} target="_blank" rel="noreferrer" className="text-accent-300 underline-offset-2 hover:underline">
                          {ln.c}
                        </a>
                      </div>
                    );
                  return <div key={i} className="whitespace-pre-wrap text-fg-muted">{ln.c}</div>;
                })}

                <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
                  <span className="text-accent-300">❯</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onInputKey}
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="terminal input"
                    className="flex-1 bg-transparent text-fg caret-accent-300 outline-none"
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
