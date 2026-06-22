import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const SITE_URL = site.url;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gabriel Mello — Software Engineer',
    template: '%s · Gabriel Mello',
  },
  description:
    'Engenheiro de software full stack especializado em produtos SaaS com Next.js, React, TypeScript e Node. Criador do FlunexApp — plataforma de automação de WhatsApp com IA.',
  keywords: [
    'Gabriel Mello',
    'Software Engineer',
    'Engenheiro de Software',
    'Full Stack',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'SaaS',
    'FlunexApp',
  ],
  authors: [{ name: 'Gabriel Mello' }],
  creator: 'Gabriel Mello',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    title: 'Gabriel Mello — Software Engineer',
    description:
      'Construo produtos SaaS de ponta a ponta. Criador do FlunexApp, plataforma de automação de WhatsApp com IA.',
    siteName: 'Gabriel Mello',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Mello — Software Engineer',
    description:
      'Construo produtos SaaS de ponta a ponta. Criador do FlunexApp.',
  },
  icons: {
    icon: [
      { url: '/brand/gm-mark.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export const viewport = {
  themeColor: '#07070b',
  colorScheme: 'dark',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gabriel Mello',
  url: site.url,
  jobTitle: 'Software Engineer',
  email: `mailto:${site.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jacarezinho',
    addressRegion: 'PR',
    addressCountry: 'BR',
  },
  sameAs: [site.socials.github, site.socials.linkedin],
  knowsAbout: [
    'Next.js', 'React', 'TypeScript', 'Node.js', 'Python',
    'Artificial Intelligence', 'RAG', 'LLM integration', 'SaaS', 'PostgreSQL',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink-950 text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
