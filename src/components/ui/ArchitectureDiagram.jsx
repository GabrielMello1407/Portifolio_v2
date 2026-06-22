import { Fragment } from 'react';

/**
 * Diagrama de arquitetura em camadas (colunas no desktop, empilhado no mobile).
 * layers: [{ title, nodes: [{ label, sub? }] }]
 */
export default function ArchitectureDiagram({ layers = [] }) {
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
              className="flex shrink-0 items-center justify-center text-accent-400"
            >
              {/* seta: → no desktop, ↓ no mobile */}
              <span className="hidden lg:block">
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <path d="M0 7h18M14 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="block py-0.5 lg:hidden">
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <path d="M7 0v16M2 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
