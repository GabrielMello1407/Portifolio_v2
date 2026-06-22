'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { useLanguage } from '@/i18n/LanguageContext';
import { site } from '@/data/site';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const payload = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* esquerda */}
        <div>
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.heading}
            subtitle={t.contact.lead}
            index="03"
          />

          <Reveal delay={0.1} className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-subtle">
              {t.contact.orReach}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
              >
                <Mail className="h-4 w-4 text-accent-300" />
                {site.email}
              </a>
              <div className="flex gap-3">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* form */}
        <Reveal delay={0.15}>
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass card-glow flex h-full min-h-[20rem] flex-col items-center justify-center rounded-2xl p-8 text-center"
            >
              <CheckCircle2 className="h-12 w-12 text-spark" />
              <p className="mt-4 text-lg font-medium text-fg">{t.contact.success}</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <div className="space-y-5">
                <Field
                  label={t.contact.email}
                  name="email"
                  type="email"
                  placeholder={t.contact.emailPh}
                  required
                />
                <Field
                  label={t.contact.subject}
                  name="subject"
                  type="text"
                  placeholder={t.contact.subjectPh}
                  required
                />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-fg"
                  >
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t.contact.messagePh}
                    className="w-full resize-none rounded-xl border border-white/10 bg-ink-950/50 px-4 py-3 text-sm text-fg placeholder-fg-subtle outline-none transition-colors focus:border-accent-300/60 focus:ring-2 focus:ring-accent-300/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 via-accent-600 to-accent-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-600/25 transition-all hover:shadow-xl hover:shadow-accent-600/40 disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.send}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-center text-sm text-red-400">{t.contact.error}</p>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

function Field({ label, name, type, placeholder, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-ink-950/50 px-4 py-3 text-sm text-fg placeholder-fg-subtle outline-none transition-colors focus:border-accent-300/60 focus:ring-2 focus:ring-accent-300/20"
      />
    </div>
  );
}
