/**
 * Builds a preview image for every listed app at build time and writes
 * public/site-previews/manifest.json. The site's own social share image
 * (og:image / twitter:image, as shown by WhatsApp etc.) is preferred; only
 * when none resolves is a live screenshot captured. A failed preview is
 * skipped and the site falls back to its category glyph, so the build never
 * fails here.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Browser, type Page } from 'playwright';
import { sites } from '../src/lib/data';
import type { Site } from '../src/lib/types';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const previewDir = path.join(rootDir, 'public', 'site-previews');
const manifestPath = path.join(previewDir, 'manifest.json');
const concurrency = Number(process.env.PREVIEW_CONCURRENCY ?? 3);
const timeoutMs = Number(process.env.PREVIEW_TIMEOUT_MS ?? 20_000);

async function writeManifest(previews: Record<string, string>) {
  await mkdir(previewDir, { recursive: true });
  await writeFile(
    manifestPath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), previews }, null, 2)}\n`,
  );
}

async function screenshot(page: Page, filePath: string) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        animations: 'disabled',
        caret: 'hide',
        path: filePath,
        quality: 55,
        type: 'jpeg',
      });
      return;
    } catch (error) {
      if (attempt === 3) throw error;
      await page.waitForTimeout(750);
    }
  }
}

const metaImageKeys = [
  'og:image:secure_url',
  'og:image:url',
  'og:image',
  'twitter:image:src',
  'twitter:image',
];
const imageExtensions: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};
const maxImageBytes = 5 * 1024 * 1024;
const fetchHeaders = {
  // Link-preview crawlers identify like this; some sites only serve meta tags to them.
  'user-agent':
    'WhatsApp/2.23 WebAudioHub-PreviewBot/1.0 (+facebookexternalhit/1.1)',
};

function attr(tag: string, name: string) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'),
  );
  return (match?.[1] ?? match?.[2] ?? match?.[3])
    ?.replace(/&amp;/g, '&')
    .trim();
}

/** Finds the share-image URLs a site declares in its HTML, best first. */
function findMetaImages(html: string, baseUrl: string) {
  const found = new Map<string, string>();
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (attr(tag, 'property') ?? attr(tag, 'name'))?.toLowerCase();
    const content = attr(tag, 'content');
    if (key && content && metaImageKeys.includes(key) && !found.has(key))
      found.set(key, content);
  }
  return metaImageKeys
    .map((key) => found.get(key))
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => {
      try {
        return [new URL(value, baseUrl).href];
      } catch {
        return [];
      }
    });
}

async function fetchMetaPreview(site: Site) {
  const pageResponse = await fetch(site.url, {
    headers: { ...fetchHeaders, accept: 'text/html' },
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!pageResponse.ok) return undefined;
  const html = (await pageResponse.text()).slice(0, 500_000);

  for (const imageUrl of findMetaImages(html, pageResponse.url)) {
    try {
      const response = await fetch(imageUrl, {
        headers: { ...fetchHeaders, accept: 'image/*' },
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
      });
      const type = response.headers
        .get('content-type')
        ?.split(';')[0]
        .trim()
        .toLowerCase();
      const extension = type && imageExtensions[type];
      if (!response.ok || !extension) continue;
      const body = Buffer.from(await response.arrayBuffer());
      if (body.length === 0 || body.length > maxImageBytes) continue;
      const fileName = `${site.id}.${extension}`;
      await writeFile(path.join(previewDir, fileName), body);
      return `site-previews/${fileName}`;
    } catch {
      // Try the next declared image.
    }
  }
  return undefined;
}

async function capture(browser: Browser, site: Site) {
  const context = await browser.newContext({
    colorScheme: 'dark',
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
    reducedMotion: 'reduce',
    viewport: { width: 1200, height: 750 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 WebAudioHub-PreviewBot/1.0',
  });
  try {
    const page = await context.newPage();
    await page.goto(site.url, {
      timeout: timeoutMs,
      waitUntil: 'domcontentloaded',
    });
    // Pages that keep streaming assets still make a useful preview.
    await page
      .waitForLoadState('networkidle', { timeout: 5000 })
      .catch(() => {});
    await page.evaluate(() =>
      document.querySelectorAll('video').forEach((video) => video.pause()),
    );
    const fileName = `${site.id}.jpg`;
    await screenshot(page, path.join(previewDir, fileName));
    return `site-previews/${fileName}`;
  } finally {
    await context.close();
  }
}

async function main() {
  await mkdir(previewDir, { recursive: true });

  // Chromium is only needed for the screenshot fallback.
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    console.warn(
      '[previews] Chromium is not installed, so only share images will be used. Run `npx playwright install chromium` for screenshot fallbacks.',
    );
  }

  const previews: Record<string, string> = {};
  const queue = [...sites];

  async function worker() {
    for (let site = queue.shift(); site; site = queue.shift()) {
      try {
        const meta = await fetchMetaPreview(site).catch(() => undefined);
        if (meta) {
          console.log(`[previews] Using share image for ${site.name}`);
          previews[site.id] = meta;
          continue;
        }
        if (!browser) {
          console.warn(
            `[previews] Skipped ${site.name}: no share image and no Chromium`,
          );
          continue;
        }
        console.log(`[previews] No share image, capturing ${site.name}`);
        previews[site.id] = await capture(browser, site);
      } catch (error) {
        const reason =
          error instanceof Error ? error.message.split('\n')[0] : String(error);
        console.warn(`[previews] Skipped ${site.name}: ${reason}`);
      }
    }
  }

  try {
    await Promise.all(
      Array.from(
        { length: Math.max(1, Math.min(concurrency, sites.length)) },
        worker,
      ),
    );
  } finally {
    await browser?.close();
  }

  await writeManifest(previews);
  console.log(
    `[previews] Wrote ${Object.keys(previews).length} of ${sites.length} previews`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
