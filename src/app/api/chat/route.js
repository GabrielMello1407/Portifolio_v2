import { PROFILE } from '@/lib/profile-context';

const MODEL = process.env.CHAT_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM = `You are the AI assistant on Gabriel Mello's portfolio website. Answer questions about Gabriel using ONLY the context below.
Rules:
- Be concise (2–5 sentences), friendly and professional. Speak about Gabriel in the third person.
- Reply in the SAME language as the user's last message (Portuguese or English).
- If the answer is not in the context, say you don't have that detail and suggest emailing gabrielmellomoraes1407@gmail.com.
- Never invent facts, employers, dates or technologies that aren't in the context.

CONTEXT:
${PROFILE}`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'invalid request' }, { status: 400 });
    }

    const history = messages
      .filter(
        (m) =>
          m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
      )
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return Response.json({
        reply:
          "O chat com IA não está configurado neste ambiente. Fale comigo direto: gabrielmellomoraes1407@gmail.com 🙂\n(The AI chat isn't configured here — reach me at gabrielmellomoraes1407@gmail.com)",
        fallback: true,
      });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: 'system', content: SYSTEM }, ...history],
      }),
    });

    if (!res.ok) {
      return Response.json({ error: 'upstream error' }, { status: 502 });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) return Response.json({ error: 'empty' }, { status: 502 });

    return Response.json({ reply });
  } catch (err) {
    return Response.json({ error: err?.message || 'error' }, { status: 500 });
  }
}
