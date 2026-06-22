'use client';

/**
 * Fundo global: malha de aurora (blobs animados) + grid sutil + ruído.
 * Puramente decorativo — fixo atrás de todo o conteúdo.
 */
export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />

      {/* aurora blobs */}
      <div className="animate-aurora will-change-transform absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--color-accent-500),transparent_62%)] opacity-50 blur-3xl" />
      <div
        className="animate-aurora will-change-transform absolute top-1/3 -right-24 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-accent-600),transparent_62%)] opacity-40 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-aurora will-change-transform absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,var(--color-accent-400),transparent_62%)] opacity-25 blur-3xl"
        style={{ animationDelay: '-11s' }}
      />

      {/* vinheta + ruído */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,var(--color-ink-950)_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
