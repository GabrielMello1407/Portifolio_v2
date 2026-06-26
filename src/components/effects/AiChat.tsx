'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { ChatMessage } from '@/types';

export default function AiChat() {
  const { lang } = useLanguage();
  const pt = lang === 'pt';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const greeting = pt
    ? 'Oi! 👋 Sou a IA do portfólio do Gabriel. Pergunte sobre a experiência, os projetos ou o stack dele.'
    : "Hi! 👋 I'm Gabriel's portfolio AI. Ask about his experience, projects or stack.";
  const suggestions = pt
    ? ['O que é o FlunexApp?', 'Ele tem experiência com IA/RAG?', 'Quais techs ele domina?']
    : ['What is FlunexApp?', 'Does he have AI/RAG experience?', "What's his tech stack?"];

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: greeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // dialog: foco inicial no input, Escape pra fechar, e devolve o foco ao
  // botão flutuante ao fechar (que reaparece quando !open)
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const id = setTimeout(() => inputRef.current?.focus(), 60);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        clearTimeout(id);
        window.removeEventListener('keydown', onKey);
      };
    }
    if (wasOpen.current) {
      const id = setTimeout(() => btnRef.current?.focus(), 60);
      return () => clearTimeout(id);
    }
  }, [open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');
    const next: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m.role !== 'system') }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            data.reply ||
            (pt ? 'Ops, algo deu errado. Tente de novo 🙏' : 'Oops, something went wrong. Try again 🙏'),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: pt ? 'Sem conexão agora 😕' : 'No connection right now 😕' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* botão flutuante (some quando o chat está aberto) */}
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={btnRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            aria-label={pt ? 'Pergunte à minha IA' : 'Ask my AI'}
            className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">{pt ? 'Pergunte à minha IA' : 'Ask my AI'}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={pt ? 'IA do Gabriel' : "Gabriel's AI"}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass card-glow fixed bottom-5 right-5 z-50 flex h-[min(70dvh,560px)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-accent-500/25"
          >
            {/* header */}
            <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-accent-400">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-fg">{pt ? 'IA do Gabriel' : "Gabriel's AI"}</p>
                <p className="font-mono text-[10px] text-accent-300">● online · RAG</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={pt ? 'Fechar chat' : 'Close chat'} className="ml-auto text-fg-subtle hover:text-fg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* mensagens */}
            <div ref={bodyRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-accent-600/90 px-3.5 py-2 text-sm text-white'
                        : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-fg-muted'
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-300"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* sugestões (só no início) */}
              {messages.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent-300/40 hover:text-fg"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label={pt ? 'Sua mensagem' : 'Your message'}
                placeholder={pt ? 'Pergunte algo sobre o Gabriel…' : 'Ask something about Gabriel…'}
                className="flex-1 rounded-full border border-white/10 bg-ink-950/50 px-4 py-2.5 text-sm text-fg placeholder-fg-subtle outline-none focus-visible:border-accent-300/60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label={pt ? 'Enviar' : 'Send'}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-accent-500 to-accent-400 text-white transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
