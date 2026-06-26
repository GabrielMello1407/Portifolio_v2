import { Fragment } from 'react';
import type { ArchitectureNode } from '@/types';

interface ResolvedLayer {
  title: string;
  nodes: ArchitectureNode[];
}

/**
 * Diagrama de arquitetura em camadas (colunas no desktop, empilhado no mobile).
 * layers: [{ title, nodes: [{ label, sub? }] }]
 */
export default function ArchitectureDiagram({ layers = [] }: { layers?: ResolvedLayer[] }) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
      {layers.map((layer, i) => (
        <Fragment key={i}>
          <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="mb-2.5 label-mono text-[10px] text-accent-300">{layer.title}</p>
            <div className="flex flex-col gap-2">
              {layer.nodes.map((n, j) => (
                <div
                  key={j}
                  className="rounded-lg border border-white/10 bg-ink-950/60 px-3 py-2"
                >
                  <p className="text-xs font-semibold text-fg">{n.label}</p>
                  {n.sub && <p className="mt-0.5 font-mono text-[10px] text-fg-subtle">{n.sub}</p>}
                </div>
              ))}
            </div>
          </div>

          {i < layers.length - 1 && (
            <div
              aria-hidden
              className="relative flex shrink-0 items-center justify-center py-1 text-accent-400/70 lg:w-12 lg:py-0"
            >
              {/* seta: → no desktop, ↓ no mobile */}
              <span className="hidden lg:block">
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <path d="M0 7h18M14 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="block lg:hidden">
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <path d="M7 0v16M2 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {/* pacote de dados que viaja pelo conector (escalonado por camada) */}
              <span
                className="animate-arch-x absolute top-1/2 hidden h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-accent-200 shadow-[0_0_10px_2px_rgba(45,212,191,0.6)] lg:block"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <span
                className="animate-arch-y absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-accent-200 shadow-[0_0_10px_2px_rgba(45,212,191,0.6)] lg:hidden"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
