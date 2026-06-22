import { ImageResponse } from 'next/og';

export const alt = 'Gabriel Mello — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#07070b',
          color: '#f4f4f7',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* glow */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(16,185,129,0.45), rgba(20,184,166,0.18) 45%, transparent 70%)',
          }}
        />
        {/* grid line top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#8b8ba6', fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 18,
              border: '2px solid rgba(45,212,191,0.5)',
              color: '#2dd4bf',
              fontWeight: 700,
              fontSize: 30,
            }}
          >
            GM
          </div>
          gabrielmello.dev
        </div>

        {/* center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 38, color: '#2dd4bf', fontFamily: 'monospace' }}>
            ~$ whoami
          </div>
          <div style={{ display: 'flex', fontSize: 120, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            <span>Gabriel&nbsp;</span>
            <span
              style={{
                backgroundImage: 'linear-gradient(100deg,#2dd4bf,#10b981 55%,#34d399)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Mello
            </span>
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: '#a1a1b5', marginTop: 6 }}>
            Software Engineer · AI Integration · Full-Stack
          </div>
        </div>

        {/* bottom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: '#8b8ba6', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', width: 12, height: 12, borderRadius: '50%', background: '#bef264' }} />
          Next.js · React · TypeScript · Node · AI / LLMs
        </div>
      </div>
    ),
    { ...size },
  );
}
