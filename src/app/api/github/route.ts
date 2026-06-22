import type { ContributionDay } from '@/types';

const USER = 'GabrielMello1407';
export const revalidate = 3600; // cache de 1h

export async function GET() {
  try {
    const headers: Record<string, string> = { 'User-Agent': 'gabriel-mello-portfolio' };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [contribRes, userRes] = await Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    const contrib = contribRes.ok ? await contribRes.json() : { contributions: [] };
    const user = userRes.ok ? await userRes.json() : {};
    const contributions: ContributionDay[] = Array.isArray(contrib.contributions)
      ? contrib.contributions
      : [];
    const total = contributions.reduce((a, c) => a + (c.count || 0), 0);

    return Response.json({
      ok: contributions.length > 0,
      total,
      contributions,
      repos: user.public_repos ?? null,
      followers: user.followers ?? null,
      profile: `https://github.com/${USER}`,
    });
  } catch {
    return Response.json({ ok: false, contributions: [] });
  }
}
