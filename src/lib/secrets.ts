/**
 * Mecânica de "caça aos segredos" — gamifica os easter eggs.
 * Persiste em localStorage e emite eventos para a UI reagir.
 */
export const SECRET_IDS: string[] = ['konami', 'gm', 'peek', 'terminal', 'sudo'];
export const TOTAL_SECRETS = SECRET_IDS.length;
const KEY = 'gm-secrets';

export function getSecrets(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as string[];
  } catch {
    return [];
  }
}

export function markSecret(id: string): void {
  if (typeof window === 'undefined' || !SECRET_IDS.includes(id)) return;
  const cur = getSecrets();
  if (cur.includes(id)) return;
  const next = [...cur, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent('gm:secret', { detail: { id, count: next.length } }),
  );
  if (next.length === TOTAL_SECRETS) {
    window.dispatchEvent(new CustomEvent('gm:complete'));
  }
}

/** Dispara o confete (ouvido pelo EasterEgg). */
export function party(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gm:party'));
  }
}
