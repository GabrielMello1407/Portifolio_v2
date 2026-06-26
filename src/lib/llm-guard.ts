/**
 * Proteções compartilhadas pelos endpoints de LLM (chat, fit…):
 * checagem de origem e sanitização anti prompt-injection.
 */
import { site } from '@/data/site';

export const ALLOWED_ORIGINS = [
  site.url,
  'http://localhost:3000',
  'http://localhost:3002',
  ...(process.env.ALLOWED_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) || []),
];

// tokens de chat/role usados em ataques de prompt injection
const INJECTION = /<\|(?:im_start|im_end|system|user|assistant|endoftext)\|>|\[\/?INST\]|<<\/?SYS>>/gi;

/** Remove zero-width + tokens de injeção e corta o tamanho. */
export function sanitize(s: string, max = 1500): string {
  return String(s ?? '')
    .replace(/[​-‍﻿]/g, '')
    .replace(INJECTION, ' ')
    .slice(0, max)
    .trim();
}

/** true se a origem veio de outro site (bloqueia embed/abuso). */
export function originForbidden(req: Request): boolean {
  const origin = req.headers.get('origin');
  return !!origin && !ALLOWED_ORIGINS.includes(origin);
}
