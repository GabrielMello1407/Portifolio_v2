import Reveal from './Reveal';
import ScrambleText from './ScrambleText';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  index,
  align = 'left',
  className,
}) {
  const centered = align === 'center';
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        centered && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2 label-mono text-xs text-accent-300',
            centered && 'justify-center',
          )}
        >
          <span className="h-px w-6 bg-gradient-to-r from-accent-300 to-transparent" />
          {index && <span className="text-fg-subtle">{index}</span>}
          <ScrambleText text={eyebrow} />
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-base text-fg-muted sm:text-lg',
            centered && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
