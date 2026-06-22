'use client';

import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/i18n/LanguageContext';

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  );
}
