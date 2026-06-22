'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

/* Nós do "editor de fluxos" — coordenadas no viewBox 0 0 460 300 */
const nodes = [
  { id: 'start', x: 18, y: 128, w: 92, label: { pt: 'Início', en: 'Start' }, dot: '#bef264' },
  { id: 'msg', x: 150, y: 52, w: 116, label: { pt: 'Mensagem', en: 'Message' }, dot: '#2dd4bf' },
  { id: 'cond', x: 150, y: 196, w: 116, label: { pt: 'Condição', en: 'Condition' }, dot: '#34d399' },
  { id: 'ai', x: 312, y: 52, w: 128, label: { pt: 'IA Gemini', en: 'Gemini AI' }, dot: '#10b981' },
  { id: 'sched', x: 312, y: 196, w: 128, label: { pt: 'Agendamento', en: 'Scheduling' }, dot: '#6ee7b7' },
];

const NODE_H = 46;
const center = (n) => ({ cx: n.x + n.w / 2, cy: n.y + NODE_H / 2 });
const rightAnchor = (n) => ({ x: n.x + n.w, y: n.y + NODE_H / 2 });
const leftAnchor = (n) => ({ x: n.x, y: n.y + NODE_H / 2 });

function curve(a, b) {
  const dx = Math.max(40, (b.x - a.x) / 2);
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

const byId = (id) => nodes.find((n) => n.id === id);
const edges = [
  [rightAnchor(byId('start')), leftAnchor(byId('msg'))],
  [rightAnchor(byId('start')), leftAnchor(byId('cond'))],
  [rightAnchor(byId('msg')), leftAnchor(byId('ai'))],
  [rightAnchor(byId('cond')), leftAnchor(byId('sched'))],
];

export default function FlunexMockup() {
  const { tx } = useLanguage();

  return (
    <div className="glass card-glow relative overflow-hidden rounded-2xl">
      {/* barra do navegador */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex-1 truncate rounded-md border border-white/10 bg-ink-950/60 px-3 py-1 text-center font-mono text-[11px] text-fg-subtle">
          app.flunexapp.com/flows
        </div>
      </div>

      {/* canvas */}
      <div className="grid-bg relative aspect-[460/300] w-full bg-ink-950/40">
        <svg viewBox="0 0 460 300" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#14b8a6" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {edges.map(([a, b], i) => (
            <g key={i}>
              <motion.path
                d={curve(a, b)}
                stroke="url(#edge)"
                strokeWidth="2"
                strokeOpacity="0.45"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
              />
              <path
                d={curve(a, b)}
                stroke="url(#edge)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-dash"
              />
            </g>
          ))}

          {nodes.map((n, i) => {
            const { cx, cy } = center(n);
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={NODE_H}
                  rx="12"
                  fill="#0e0e18"
                  stroke="#ffffff"
                  strokeOpacity="0.12"
                />
                <circle cx={n.x + 16} cy={cy} r="4.5" fill={n.dot} />
                <text
                  x={n.x + 30}
                  y={cy}
                  dominantBaseline="central"
                  fill="#e7e7ef"
                  fontSize="13"
                  fontFamily="var(--font-mono)"
                >
                  {tx(n.label)}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
