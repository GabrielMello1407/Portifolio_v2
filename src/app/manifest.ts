import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gabriel Mello — Software Engineer',
    short_name: 'Gabriel Mello',
    description:
      'Engenheiro de software full stack — SaaS, IA aplicada e sistemas em produção.',
    start_url: '/',
    display: 'standalone',
    lang: 'pt-BR',
    background_color: '#07070b',
    theme_color: '#07070b',
    icons: [
      { src: '/brand/gm-mark.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
