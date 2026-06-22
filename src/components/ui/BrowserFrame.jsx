/** Moldura de navegador com uma captura de tela. */
export default function BrowserFrame({ src, alt, url = '' }) {
  return (
    <div className="glass card-glow group/frame relative overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        {url && (
          <div className="ml-3 flex-1 truncate rounded-md border border-white/10 bg-ink-950/60 px-3 py-1 text-center font-mono text-[11px] text-fg-subtle">
            {url}
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block w-full transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]"
        />
      </div>
    </div>
  );
}
