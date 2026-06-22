/**
 * Rate limiter em memória (janela deslizante).
 * Suficiente porque o app roda como 1 processo (PM2 fork) na VPS.
 * Não compartilha estado entre instâncias — para multi-instância, trocar por Redis.
 */
const buckets = new Map();

export function rateLimit(key, { max = 15, windowMs = 5 * 60 * 1000 } = {}) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  // limpeza preguiçosa para não vazar memória
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return { ok: true };
}

export function clientIp(req) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}
