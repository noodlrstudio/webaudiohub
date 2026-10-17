import type { Site, SiteStatus } from './types';

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandom<T>(items: readonly T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Pings each site with a no-cors request. The response is opaque, but a
 * DNS or network failure throws, which is enough to flag a dead link.
 */
export function checkSites(
  sites: readonly Site[],
  onStatus: (id: string, status: SiteStatus) => void,
): void {
  for (const site of sites) {
    onStatus(site.id, 'checking');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);
    fetch(site.url, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(() => onStatus(site.id, 'up'))
      .catch(() => onStatus(site.id, 'down'))
      .finally(() => clearTimeout(timer));
  }
}

function withBase(path: string): string {
  if (/^(https?:|data:|\/)/.test(path)) return path;
  const base = import.meta.env.BASE_URL || './';
  return `${base}${path.replace(/^\.?\//, '')}`;
}

/** Loads the build-time screenshot manifest, if previews were generated. */
export async function loadPreviews(): Promise<Record<string, string>> {
  try {
    const response = await fetch(withBase('site-previews/manifest.json'), {
      cache: 'force-cache',
    });
    if (!response.ok) return {};
    const manifest = (await response.json()) as {
      previews?: Record<string, string>;
    };
    return Object.fromEntries(
      Object.entries(manifest.previews ?? {}).map(([id, path]) => [
        id,
        withBase(path),
      ]),
    );
  } catch {
    return {};
  }
}
