import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Prende o Tab dentro do container enquanto `active` (WCAG 2.4.3, focus order).
 * Ouve no `document` (fase de bubble, depois do React) e ignora eventos já
 * tratados — assim não atropela o Tab de autocomplete do terminal, que faz
 * preventDefault no próprio input.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || e.defaultPrevented) return;
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetWidth > 0 || n.offsetHeight > 0 || n === document.activeElement,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const a = document.activeElement;
      if (e.shiftKey) {
        if (a === first || !el.contains(a)) {
          e.preventDefault();
          last.focus();
        }
      } else if (a === last || !el.contains(a)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [ref, active]);
}
