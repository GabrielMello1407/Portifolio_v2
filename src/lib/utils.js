import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Une classes condicionais resolvendo conflitos do Tailwind. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
