'use client';

const TECHS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'Redis', 'Docker', 'AWS', 'GSAP', 'Tailwind CSS', 'BullMQ',
  'Socket.io', 'RAG', 'LLMs', 'React Native',
];

export default function TechMarquee() {
  return (
    <div className="edge-fade-x relative overflow-hidden border-y border-white/[0.06] py-5">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {[...TECHS, ...TECHS].map((tech, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-mono text-sm tracking-wide text-fg-subtle"
          >
            {tech}
            <span className="text-accent-500">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
