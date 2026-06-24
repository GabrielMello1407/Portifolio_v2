'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { resumeByLang } from '@/i18n/dictionary';
import { site } from '@/data/site';
import { ROOT, type VDir, type VFile, type VNode } from '@/data/terminal-fs';
import { markSecret, getSecrets, TOTAL_SECRETS } from '@/lib/secrets';

interface TermLine {
  k: 'in' | 'out' | 'sys' | 'link';
  c: string;
  href?: string;
  p?: string; // prompt path (linhas de input)
}

type Overlay = Record<string, { name: string; dir: boolean }[]>;
interface Entry {
  name: string;
  dir: boolean;
  hidden: boolean;
}

const keyOf = (segs: string[]) => segs.join('/');

/** Resolve um caminho (relativo, absoluto ou ~) em segmentos, tratando . e .. */
function resolvePath(cwd: string[], raw: string): string[] {
  let base: string[];
  let rest: string;
  if (raw.startsWith('~')) {
    base = [];
    rest = raw.slice(1);
  } else if (raw.startsWith('/')) {
    base = [];
    rest = raw;
  } else {
    base = [...cwd];
    rest = raw;
  }
  const out = [...base];
  for (const seg of rest.split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') out.pop();
    else out.push(seg);
  }
  return out;
}

/** Nó na árvore base (imutável). Retorna null para caminhos só do overlay. */
function baseNodeAt(segs: string[]): VNode | null {
  let node: VNode = ROOT;
  for (const seg of segs) {
    if (node.type !== 'dir') return null;
    const next: VNode | undefined = node.children[seg];
    if (!next) return null;
    node = next;
  }
  return node;
}

function entriesFor(segs: string[], created: Overlay): Entry[] {
  const node = baseNodeAt(segs);
  const base: Entry[] =
    node && node.type === 'dir'
      ? Object.entries(node.children).map(([name, n]) => ({ name, dir: n.type === 'dir', hidden: !!n.hidden }))
      : [];
  const extra: Entry[] = (created[keyOf(segs)] ?? []).map((e) => ({ name: e.name, dir: e.dir, hidden: false }));
  return [...base, ...extra];
}

function dirExists(segs: string[], created: Overlay): boolean {
  if (segs.length === 0) return true;
  const n = baseNodeAt(segs);
  if (n && n.type === 'dir') return true;
  const parent = segs.slice(0, -1);
  const name = segs[segs.length - 1];
  return (created[keyOf(parent)] ?? []).some((e) => e.name === name && e.dir);
}

function createdEntry(segs: string[], created: Overlay) {
  const parent = segs.slice(0, -1);
  const name = segs[segs.length - 1];
  return (created[keyOf(parent)] ?? []).find((e) => e.name === name);
}

function treeLines(segs: string[], created: Overlay, showAll: boolean): string[] {
  const lines = ['.'];
  const walk = (path: string[], prefix: string) => {
    const vis = entriesFor(path, created)
      .filter((e) => showAll || !e.hidden)
      .sort((a, b) => a.name.localeCompare(b.name));
    vis.forEach((e, i) => {
      const last = i === vis.length - 1;
      lines.push(`${prefix}${last ? '└── ' : '├── '}${e.name}${e.dir ? '/' : ''}`);
      if (e.dir) walk([...path, e.name], prefix + (last ? '    ' : '│   '));
    });
  };
  walk(segs, '');
  return lines;
}

function scrollTo(sel: string) {
  const el = sel === '#top' ? document.body : document.querySelector(sel);
  if (!el) return;
  if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el as HTMLElement, { offset: -80 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Terminal() {
  const { lang } = useLanguage();
  const pt = lang === 'pt';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TermLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [cwd, setCwd] = useState<string[]>([]);
  const [created, setCreated] = useState<Overlay>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const promptPath = '~' + (cwd.length ? '/' + cwd.join('/') : '');

  const banner = pt
    ? ["Bem-vindo ao terminal do Gabriel.", "Digite 'help' para os comandos, ou 'ls' pra começar a explorar. (Esc para sair)"]
    : ["Welcome to Gabriel's terminal.", "Type 'help' for commands, or 'ls' to start exploring. (Esc to close)"];

  // abrir: "/" ou Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable;
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
    const openTerm = () => setOpen(true);
    window.addEventListener('open-terminal', openTerm);
    return () => window.removeEventListener('open-terminal', openTerm);
  }, []);

  // ao abrir
  useEffect(() => {
    if (!open) return;
    markSecret('terminal');
    if (lines.length === 0) setLines(banner.map((t): TermLine => ({ k: 'sys', c: t })));
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

  const print = (arr: TermLine[]) => setLines((l) => [...l, ...arr]);

  const run = (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    print([{ k: 'in', c: raw, p: promptPath }]);
    setHistory((h) => [...h, raw]);
    setHIdx(-1);

    const out = (txt: string | string[]) =>
      print(Array.isArray(txt) ? txt.map((c): TermLine => ({ k: 'out', c })) : [{ k: 'out', c: txt }]);

    const tokens = line.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);
    const flags = args.filter((t) => t.startsWith('-'));
    const operands = args.filter((t) => !t.startsWith('-'));
    const showAll = flags.some((f) => /a/.test(f));
    const arg0 = operands[0];

    const noSuch = pt ? 'arquivo ou diretório inexistente' : 'no such file or directory';
    const fileBody = (name: string) => (ROOT.children[name] as VFile).body![lang];

    // ── navegação no filesystem ──────────────────────────────
    if (cmd === 'ls' || cmd === 'dir') {
      const target = arg0 ? resolvePath(cwd, arg0) : cwd;
      if (!dirExists(target, created)) {
        const n = baseNodeAt(target);
        if ((n && n.type === 'file') || createdEntry(target, created)) out(arg0);
        else out(`ls: ${arg0}: ${noSuch}`);
        return;
      }
      const entries = entriesFor(target, created)
        .filter((e) => showAll || !e.hidden)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((e) => (e.dir ? `${e.name}/` : e.name));
      out(entries.length ? entries.join('   ') : '');
      return;
    }

    if (cmd === 'cd') {
      if (!arg0 || arg0 === '~') {
        setCwd([]);
        return;
      }
      const target = resolvePath(cwd, arg0);
      if (dirExists(target, created)) setCwd(target);
      else if (baseNodeAt(target)?.type === 'file' || createdEntry(target, created))
        out(`cd: ${arg0}: ${pt ? 'não é um diretório' : 'not a directory'}`);
      else out(`cd: ${arg0}: ${noSuch}`);
      return;
    }

    if (cmd === 'pwd') {
      out('/home/gabriel' + (cwd.length ? '/' + cwd.join('/') : ''));
      return;
    }

    if (cmd === 'tree') {
      out(treeLines(cwd, created, showAll));
      return;
    }

    if (cmd === 'cat' || cmd === 'less' || cmd === 'more') {
      if (!arg0) {
        out(`cat: ${pt ? 'falta o nome do arquivo' : 'missing file operand'}`);
        return;
      }
      const target = resolvePath(cwd, arg0);
      if (dirExists(target, created)) {
        out(`cat: ${arg0}: ${pt ? 'é um diretório' : 'is a directory'}`);
        return;
      }
      const node = baseNodeAt(target);
      if (node && node.type === 'file') {
        if (node.locked && getSecrets().length < TOTAL_SECRETS) {
          out(pt ? '🔒 arquivo criptografado. decifre encontrando todos os segredos.' : '🔒 encrypted file. decrypt it by finding every secret.');
          return;
        }
        if (node.secret) markSecret(node.secret);
        if (node.body) out(node.body[lang]);
        if (node.links?.length) print(node.links.map((l): TermLine => ({ k: 'link', c: l.label, href: l.href })));
        return;
      }
      if (createdEntry(target, created)) {
        out(''); // arquivo vazio criado na sessão
        return;
      }
      out(`cat: ${arg0}: ${noSuch}`);
      return;
    }

    if (cmd === 'mkdir' || cmd === 'touch') {
      if (!arg0) {
        out(`${cmd}: ${pt ? 'falta o nome' : 'missing operand'}`);
        return;
      }
      const target = resolvePath(cwd, arg0);
      const parent = target.slice(0, -1);
      const name = target[target.length - 1];
      if (!name) return;
      if (!dirExists(parent, created)) {
        out(`${cmd}: ${arg0}: ${noSuch}`);
        return;
      }
      if (baseNodeAt(target) || createdEntry(target, created)) {
        out(pt ? `${cmd}: '${name}': já existe` : `${cmd}: '${name}': File exists`);
        return;
      }
      setCreated((c) => ({
        ...c,
        [keyOf(parent)]: [...(c[keyOf(parent)] ?? []), { name, dir: cmd === 'mkdir' }],
      }));
      return; // silencioso, como no shell de verdade
    }

    if (cmd === 'rm' || cmd === 'rmdir') {
      const arg = operands[operands.length - 1];
      if (!arg) {
        out(`rm: ${pt ? 'falta o operando' : 'missing operand'}`);
        return;
      }
      const target = resolvePath(cwd, arg);
      if (target.length === 0 || arg === '*' || arg === '/' || arg === '~') {
        out(pt ? '🌀 … brincadeira. tá tudo no lugar. boa tentativa 😏' : '🌀 … just kidding. everything is fine. nice try 😏');
        return;
      }
      if (baseNodeAt(target)) {
        out(pt ? `rm: '${arg}': permissão negada (somente leitura)` : `rm: '${arg}': Permission denied (read-only)`);
        return;
      }
      const parent = target.slice(0, -1);
      const name = target[target.length - 1];
      if (createdEntry(target, created)) {
        setCreated((c) => ({ ...c, [keyOf(parent)]: (c[keyOf(parent)] ?? []).filter((e) => e.name !== name) }));
        return;
      }
      out(`rm: ${arg}: ${noSuch}`);
      return;
    }

    if (cmd === 'echo') {
      out(args.join(' ').replace(/\$USER/g, 'gabriel').replace(/\$PWD/g, '/home/gabriel' + (cwd.length ? '/' + cwd.join('/') : '')));
      return;
    }

    // ── atalhos / conteúdo ───────────────────────────────────
    if (cmd === 'help' || cmd === '?') {
      out(
        pt
          ? [
              'navegação   ls · cd · pwd · cat · tree',
              'criar       mkdir · touch · rm   (só no que você criar)',
              'atalhos     about · projects · skills · experience · contact · resume · social',
              'sistema     secrets · clear · exit',
              '',
              "dica        nem tudo aparece num 'ls'. explore. 👀",
            ]
          : [
              'navigate    ls · cd · pwd · cat · tree',
              'create      mkdir · touch · rm   (only what you create)',
              'shortcuts   about · projects · skills · experience · contact · resume · social',
              'system      secrets · clear · exit',
              '',
              "tip         not everything shows in 'ls'. explore. 👀",
            ],
      );
    } else if (cmd === 'whoami') {
      out('gabriel');
    } else if (cmd === 'about') {
      out(fileBody('about.txt'));
    } else if (cmd === 'skills' || cmd === 'stack') {
      out(fileBody('skills.txt'));
    } else if (cmd === 'experience' || cmd === 'exp') {
      out(fileBody('experience.txt'));
    } else if (cmd === 'projects' || cmd === 'work') {
      out(pt ? 'abrindo projetos…' : 'opening projects…');
      setOpen(false);
      setTimeout(() => scrollTo('#projects'), 150);
    } else if (cmd === 'about-me') {
      setOpen(false);
      setTimeout(() => scrollTo('#about'), 150);
    } else if (cmd === 'contact') {
      out(fileBody('contact.txt'));
      const f = ROOT.children['contact.txt'] as VFile;
      if (f.links?.length) print(f.links.map((l): TermLine => ({ k: 'link', c: l.label, href: l.href })));
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
      out(
        n >= TOTAL_SECRETS
          ? pt
            ? `🏆 ${n}/${TOTAL_SECRETS} — você achou todos! lendário.`
            : `🏆 ${n}/${TOTAL_SECRETS} — you found them all! legendary.`
          : pt
            ? `${n}/${TOTAL_SECRETS} segredos. continue procurando 👀`
            : `${n}/${TOTAL_SECRETS} secrets. keep looking 👀`,
      );
    } else if (cmd === 'sudo') {
      markSecret('sudo');
      out(pt ? '🔓 permissão concedida. abrindo seu cliente de email…' : '🔓 permission granted. opening your email client…');
      setTimeout(() => {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(pt ? 'Vamos trabalhar juntos' : "Let's work together")}`;
      }, 900);
    } else if (cmd === 'hire-me' || cmd === 'hire') {
      markSecret('sudo');
      out(pt ? '🔓 boa! abrindo seu cliente de email…' : '🔓 nice! opening your email client…');
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput('');
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      if (i >= history.length) {
        setHIdx(-1);
        setInput('');
      } else {
        setHIdx(i);
        setInput(history[i]);
      }
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
                <span className="ml-2 truncate font-mono text-xs text-fg-subtle">gabriel@portfolio:{promptPath}</span>
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
                        <span className="text-accent-400/70">{ln.p}</span> <span className="text-accent-300">❯</span> {ln.c}
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
                  return <div key={i} className="whitespace-pre-wrap text-fg-muted">{ln.c || ' '}</div>;
                })}

                <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
                  <span className="shrink-0 text-accent-400/70">{promptPath}</span>
                  <span className="shrink-0 text-accent-300">❯</span>
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
