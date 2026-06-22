'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/i18n/LanguageContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  );
}
