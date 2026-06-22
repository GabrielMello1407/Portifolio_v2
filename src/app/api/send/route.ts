import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'gabrielmellomoraes1407@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Portfólio <onboarding@resend.dev>';

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (s = ''): string =>
  String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] ?? c);

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    if (!isEmail(email) || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Dados inválidos. / Invalid data.' },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Serviço de email não configurado.' },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Portfólio] ${subject}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">Nova mensagem pelo portfólio</h2>
          <p><strong>De:</strong> ${esc(email)}</p>
          <p><strong>Assunto:</strong> ${esc(subject)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap">${esc(message)}</p>
        </div>
      `,
    });

    if (data?.error) {
      return NextResponse.json({ error: data.error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.data?.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro inesperado.' },
      { status: 500 },
    );
  }
}
