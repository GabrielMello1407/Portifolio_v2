/**
 * Filesystem virtual do terminal — um Unix de mentira, mas explorável.
 * O usuário navega com ls/cd/cat/tree e descobre easter eggs escondidos.
 *
 * Os arquivos dos projetos são gerados a partir de src/data/projects.ts,
 * então o conteúdo do `cat` nunca fica fora de sincronia com o site real.
 */
import type { Bilingual } from '@/types';
import { featured, projects } from './projects';
import { site } from './site';

export interface VFile {
  type: 'file';
  hidden?: boolean;
  /** Conteúdo do `cat`, por idioma (uma linha por item). */
  body?: { pt: string[]; en: string[] };
  /** Links clicáveis exibidos depois do corpo (ex.: URL ao vivo). */
  links?: { label: string; href: string }[];
  /** Marca este segredo quando o arquivo é lido com `cat`. */
  secret?: string;
  /** Exige que todos os segredos tenham sido encontrados para ler. */
  locked?: boolean;
}
export interface VDir {
  type: 'dir';
  hidden?: boolean;
  children: Record<string, VNode>;
}
export type VNode = VFile | VDir;

const r = (v: Bilingual, l: 'pt' | 'en'): string => (typeof v === 'string' ? v : v[l]);

interface SrcProject {
  name: Bilingual;
  tagline: Bilingual;
  text: Bilingual;
  role: Bilingual;
  year: Bilingual;
  stack: string[];
  liveUrl?: string | null;
  status?: string;
}

function projectFile(p: SrcProject): VFile {
  const make = (l: 'pt' | 'en'): string[] => {
    const lines = [
      r(p.name, l),
      r(p.tagline, l),
      '',
      r(p.text, l),
      '',
      `${l === 'pt' ? 'papel' : 'role'}:  ${r(p.role, l)}  ·  ${r(p.year, l)}`,
      `stack:  ${p.stack.join(' · ')}`,
    ];
    if (p.liveUrl) {
      lines.push(`live:   ${p.liveUrl}`);
    } else {
      const s =
        p.status === 'development'
          ? l === 'pt'
            ? 'em desenvolvimento'
            : 'in development'
          : l === 'pt'
            ? 'privado · institucional'
            : 'private · institutional';
      lines.push(`status: ${s}`);
    }
    return lines;
  };
  return {
    type: 'file',
    body: { pt: make('pt'), en: make('en') },
    links: p.liveUrl ? [{ label: p.liveUrl, href: p.liveUrl }] : [],
  };
}

const projectChildren: Record<string, VNode> = {
  'flunexapp.md': projectFile({ ...featured, text: featured.summary }),
};
for (const pr of projects) {
  projectChildren[`${pr.id}.md`] = projectFile({ ...pr, text: pr.description });
}

const aboutFile: VFile = {
  type: 'file',
  body: {
    pt: [
      'Gabriel Mello — Software Engineer (IA aplicada · Full-Stack)',
      'Jacarezinho, PR · Brasil — aberto a remoto, híbrido e presencial',
      '',
      '3+ anos construindo SaaS e features de IA que rodam em produção.',
      'Forte em problema aberto: requisito ambíguo, base sem documentação',
      'e integração entre sistemas que nunca foram feitos pra conversar.',
    ],
    en: [
      'Gabriel Mello — Software Engineer (applied AI · Full-Stack)',
      'Jacarezinho, PR · Brazil — open to remote, hybrid and on-site',
      '',
      '3+ years building SaaS and AI features that run in production.',
      'Strong at open-ended problems: ambiguous requirements, undocumented',
      'codebases and integrations between systems never meant to talk.',
    ],
  },
};

const skillsFile: VFile = {
  type: 'file',
  body: {
    pt: [
      'frontend  React · Next.js · TypeScript · Tailwind · Framer Motion · GSAP',
      'backend   Node.js · Python (Django/FastAPI) · REST · webhooks · filas',
      'dados     PostgreSQL · MySQL · Redis',
      'ia/llm    Gemini · Claude · Groq · RAG · LiteLLM · embeddings',
      'cloud     AWS (5 certs) · Docker · CI/CD · PM2 · Nginx',
      'mobile    React Native · Kotlin (GeckoView)',
    ],
    en: [
      'frontend  React · Next.js · TypeScript · Tailwind · Framer Motion · GSAP',
      'backend   Node.js · Python (Django/FastAPI) · REST · webhooks · queues',
      'data      PostgreSQL · MySQL · Redis',
      'ai/llm    Gemini · Claude · Groq · RAG · LiteLLM · embeddings',
      'cloud     AWS (5 certs) · Docker · CI/CD · PM2 · Nginx',
      'mobile    React Native · Kotlin (GeckoView)',
    ],
  },
};

const experienceFile: VFile = {
  type: 'file',
  body: {
    pt: [
      '2025 → agora   UENP · Analista Desenvolvedor',
      '               ecossistema digital, ferramentas de IA, integrações',
      '2026 → agora   FlunexApp · Founder & Lead Engineer',
      '               SaaS multi-tenant do zero — arquitetura a billing',
      '2023 → agora   SouJunior Labs · Voluntário Front-End',
    ],
    en: [
      '2025 → now     UENP · Developer Analyst',
      '               digital ecosystem, AI tooling, integrations',
      '2026 → now     FlunexApp · Founder & Lead Engineer',
      '               multi-tenant SaaS from scratch — architecture to billing',
      '2023 → now     SouJunior Labs · Volunteer Front-End Developer',
    ],
  },
};

const contactFile: VFile = {
  type: 'file',
  body: {
    pt: [
      `email     ${site.email}`,
      `github    ${site.socials.github}`,
      `linkedin  ${site.socials.linkedin}`,
      '',
      'dica: rode `social` pra abrir os links, ou `sudo hire-me` 😏',
    ],
    en: [
      `email     ${site.email}`,
      `github    ${site.socials.github}`,
      `linkedin  ${site.socials.linkedin}`,
      '',
      'tip: run `social` to open the links, or `sudo hire-me` 😏',
    ],
  },
  links: [
    { label: 'GitHub', href: site.socials.github },
    { label: 'LinkedIn', href: site.socials.linkedin },
    { label: site.email, href: `mailto:${site.email}` },
  ],
};

const resumeFile: VFile = {
  type: 'file',
  body: {
    pt: [
      '%PDF-1.7  %âãÏÓ  ... (arquivo binário)',
      '',
      'isto é um PDF — rode `resume` pra baixar o currículo.',
    ],
    en: [
      '%PDF-1.7  %âãÏÓ  ... (binary file)',
      '',
      'this is a PDF — run `resume` to download the resume.',
    ],
  },
};

const readmeFile: VFile = {
  type: 'file',
  body: {
    pt: [
      'Terminal do portfólio do Gabriel — um shell de mentira, mas explorável.',
      '',
      'Navegue como num Unix:  ls · cd · cat · pwd · tree',
      'Crie coisas:            mkdir · touch · rm  (só no que você criar 😉)',
      '',
      'psst… nem tudo aparece num `ls` simples. Tenta `ls -a`.',
    ],
    en: [
      "Gabriel's portfolio terminal — a fake shell, but an explorable one.",
      '',
      'Navigate like Unix:  ls · cd · cat · pwd · tree',
      'Make things:         mkdir · touch · rm  (only what you create 😉)',
      '',
      "psst… not everything shows in a plain `ls`. Try `ls -a`.",
    ],
  },
};

const hintFile: VFile = {
  type: 'file',
  secret: 'explorer',
  body: {
    pt: [
      'Você achou a pasta escondida. +1 segredo 🎉',
      '',
      'Faltam outros por aí. Pistas:',
      '  • um clássico dos videogames:  ↑ ↑ ↓ ↓ ← → ← → B A',
      '  • cumprimente como dev: digite "gm" (no site, fora de campos)',
      '  • troque de aba e volte 👀',
      '  • aqui no terminal, peça admin:  sudo hire-me',
      '',
      'Acompanhe no medidor (canto inferior esquerdo).',
    ],
    en: [
      'You found the hidden folder. +1 secret 🎉',
      '',
      'There are more out there. Clues:',
      '  • a gaming classic:  ↑ ↑ ↓ ↓ ← → ← → B A',
      '  • greet like a dev: type "gm" (on the page, outside inputs)',
      '  • switch tabs and come back 👀',
      '  • here in the terminal, ask for admin:  sudo hire-me',
      '',
      'Track them in the meter (bottom-left corner).',
    ],
  },
};

const treasureFile: VFile = {
  type: 'file',
  locked: true,
  body: {
    pt: [
      '🏆 Você decifrou o baú — achou TODOS os segredos. Respeito.',
      '',
      'Manda um "gm" no meu email e diz que abriu o baú. Vou rir. 😄',
      site.email,
    ],
    en: [
      '🏆 You cracked the chest — found EVERY secret. Respect.',
      '',
      'Send me a "gm" by email and say you opened the chest. I will laugh. 😄',
      site.email,
    ],
  },
};

export const ROOT: VDir = {
  type: 'dir',
  children: {
    'about.txt': aboutFile,
    'skills.txt': skillsFile,
    'experience.txt': experienceFile,
    'contact.txt': contactFile,
    'resume.pdf': resumeFile,
    'README.md': readmeFile,
    projects: { type: 'dir', children: projectChildren },
    '.secret': {
      type: 'dir',
      hidden: true,
      children: { 'hint.txt': hintFile, 'treasure.txt': treasureFile },
    },
  },
};

/** Manual dos comandos (usado por `man <cmd>` e como vocabulário do autocomplete). */
export interface ManEntry {
  use: string;
  pt: string;
  en: string;
}
export const MAN: Record<string, ManEntry> = {
  help: { use: 'help', pt: 'Lista os comandos disponíveis.', en: 'List the available commands.' },
  man: { use: 'man <comando>', pt: 'Mostra o manual de um comando.', en: "Show a command's manual." },
  ls: { use: 'ls [-a] [caminho]', pt: 'Lista arquivos e pastas. -a mostra os ocultos.', en: 'List files and folders. -a shows hidden ones.' },
  cd: { use: 'cd [caminho]', pt: 'Entra num diretório. .. sobe, ~ vai pra home.', en: 'Enter a directory. .. goes up, ~ is home.' },
  pwd: { use: 'pwd', pt: 'Mostra o diretório atual.', en: 'Print the current directory.' },
  cat: { use: 'cat <arquivo>', pt: 'Mostra o conteúdo de um arquivo.', en: "Show a file's contents." },
  tree: { use: 'tree [-a]', pt: 'Desenha a árvore de diretórios a partir daqui.', en: 'Draw the directory tree from here.' },
  mkdir: { use: 'mkdir <nome>', pt: 'Cria um diretório (só na sua sessão).', en: 'Create a directory (session-only).' },
  touch: { use: 'touch <nome>', pt: 'Cria um arquivo vazio (só na sua sessão).', en: 'Create an empty file (session-only).' },
  rm: { use: 'rm <nome>', pt: 'Remove o que você criou. Os arquivos originais são só-leitura.', en: 'Remove what you created. Base files are read-only.' },
  echo: { use: 'echo <texto>', pt: 'Repete o texto. Entende $USER e $PWD.', en: 'Echo text. Understands $USER and $PWD.' },
  grep: { use: 'grep <termo> [arquivo]', pt: 'Busca um termo. Sem arquivo, varre nome E conteúdo de tudo.', en: 'Search a term. With no file, scans both names AND content.' },
  find: { use: 'find [nome]', pt: 'Procura arquivos/pastas pelo nome.', en: 'Find files/folders by name.' },
  wc: { use: 'cat <arquivo> | wc', pt: 'Conta as linhas (só depois de um |).', en: 'Count lines (only after a |).' },
  clear: { use: 'clear', pt: 'Limpa a tela.', en: 'Clear the screen.' },
  exit: { use: 'exit', pt: 'Fecha o terminal.', en: 'Close the terminal.' },
  about: { use: 'about', pt: 'Quem é o Gabriel (= cat about.txt).', en: 'Who Gabriel is (= cat about.txt).' },
  projects: { use: 'projects', pt: 'Rola até a seção de projetos.', en: 'Scroll to the projects section.' },
  skills: { use: 'skills [--top]', pt: 'Lista a stack. --top mostra o ranking das techs.', en: 'List the tech stack. --top shows the tech ranking.' },
  experience: { use: 'experience', pt: 'Linha do tempo profissional.', en: 'Professional timeline.' },
  contact: { use: 'contact', pt: 'Mostra email e redes.', en: 'Show email and socials.' },
  resume: { use: 'resume', pt: 'Baixa o currículo em PDF.', en: 'Download the resume PDF.' },
  social: { use: 'social', pt: 'Abre GitHub / LinkedIn / email.', en: 'Open GitHub / LinkedIn / email.' },
  secrets: { use: 'secrets', pt: 'Quantos segredos você já achou.', en: 'How many secrets you have found.' },
  gm: { use: 'gm', pt: 'Diz oi como um dev. ☀️', en: 'Say hi like a dev. ☀️' },
  whoami: { use: 'whoami', pt: 'Adivinha. 😄', en: 'Take a guess. 😄' },
  sudo: { use: 'sudo hire-me', pt: 'Permissão de admin… 😏', en: 'Admin permission… 😏' },
  theme: { use: 'theme', pt: 'Sobre o tema do site.', en: 'About the site theme.' },
};

/** Nomes completáveis com Tab (comando + os principais aliases de path). */
export const COMMAND_NAMES: string[] = Object.keys(MAN);

/**
 * Ranking das tecnologias mais usadas, contado de verdade a partir dos
 * `stack[]` do projeto em destaque + dos demais. Versões são agrupadas
 * (`Next.js 16` e `Next.js` viram `Next.js`). Usado por `stack --top`.
 */
export function techRanking(): { name: string; count: number }[] {
  const norm = (t: string) => t.replace(/\s+v?\d+(?:\.\d+)*$/i, '').trim();
  const counts = new Map<string, number>();
  const add = (stack: string[]) => {
    for (const raw of stack) {
      const n = norm(raw);
      counts.set(n, (counts.get(n) ?? 0) + 1);
    }
  };
  add(featured.stack);
  for (const p of projects) add(p.stack);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Man page do próprio Gabriel — easter egg de `man gabriel`. */
export const MAN_GABRIEL: { pt: string[]; en: string[] } = {
  pt: [
    'GABRIEL(1)                 Manual do Engenheiro                 GABRIEL(1)',
    '',
    'NOME',
    '    gabriel — software engineer (IA aplicada · full-stack)',
    '',
    'SINOPSE',
    '    gabriel [--remoto] [--híbrido] [--presencial] <problema-difícil>',
    '',
    'DESCRIÇÃO',
    '    Transforma requisito ambíguo em sistema rodando em produção.',
    '    Forte em SaaS multi-tenant, features de IA (RAG/LLM) e em integrar',
    '    sistemas que nunca foram feitos pra conversar.',
    '',
    'EXEMPLOS',
    '    gabriel --remoto "construa um SaaS do zero"   # → FlunexApp',
    '    gabriel "gere ETPs com IA em <10min"          # → Gerador de ETP',
    '',
    'BUGS',
    '    Perde a hora quando o problema é interessante demais.',
    '',
    'VEJA TAMBÉM',
    '    resume(1) · projects(1) · ./hire-me.sh',
  ],
  en: [
    'GABRIEL(1)                  Engineer Manual                  GABRIEL(1)',
    '',
    'NAME',
    '    gabriel — software engineer (applied AI · full-stack)',
    '',
    'SYNOPSIS',
    '    gabriel [--remote] [--hybrid] [--onsite] <hard-problem>',
    '',
    'DESCRIPTION',
    '    Turns ambiguous requirements into systems running in production.',
    '    Strong at multi-tenant SaaS, AI features (RAG/LLM) and wiring up',
    '    systems that were never meant to talk to each other.',
    '',
    'EXAMPLES',
    '    gabriel --remote "build a SaaS from scratch"  # → FlunexApp',
    '    gabriel "generate ETPs with AI in <10min"     # → ETP Generator',
    '',
    'BUGS',
    '    Loses track of time when the problem is too interesting.',
    '',
    'SEE ALSO',
    '    resume(1) · projects(1) · ./hire-me.sh',
  ],
};
