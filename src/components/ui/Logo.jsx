import { cn } from '@/lib/utils';

/**
 * Marca tipográfica "Gabriel Mello".
 * variant: 'full' (monograma + nome) · 'wordmark' (só nome) · 'mark' (só monograma)
 */
export default function Logo({ variant = 'full', className, onClick }) {
  const Mark = (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-ink-900">
      <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-accent-500),var(--color-accent-600)_50%,var(--color-accent-400))] opacity-20" />
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
      <span className="text-gradient relative font-display text-base font-bold tracking-tighter">
        GM
      </span>
    </span>
  );

  const Wordmark = (
    <span className="font-display text-lg font-semibold leading-none tracking-tight text-fg">
      Gabriel<span className="text-gradient">&nbsp;Mello</span>
      <span className="text-spark">.</span>
    </span>
  );

  return (
    <span
      onClick={onClick}
      className={cn('inline-flex items-center gap-2.5 select-none', className)}
    >
      {variant !== 'wordmark' && Mark}
      {variant !== 'mark' && Wordmark}
    </span>
  );
}
