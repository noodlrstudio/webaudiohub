/**
 * Captures a screenshot of every listed app at build time and writes
 * public/site-previews/manifest.json. A failed capture is skipped and the
 * site falls back to its category glyph, so the build never fails here.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Browser, type Page } from 'playwright';
import { sites } from '../src/lib/data';
import type { Site } from '../src/lib/types';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
    await page.goto(site.url, { timeout: timeoutMs, waitUntil: 'domcontentloaded' });
    // Pages that keep streaming assets still make a useful preview.
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
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

  let browser: Browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    console.warn(
      '[previews] Chromium is not installed. Run `npx playwright install chromium` to generate previews.',
    );
    await writeManifest({});
    return;
  }

  const previews: Record<string, string> = {};
  const queue = [...sites];

  async function worker() {
    for (let site = queue.shift(); site; site = queue.shift()) {
      try {
        console.log(`[previews] Capturing ${site.name}`);
        previews[site.id] = await capture(browser, site);
      } catch (error) {
        const reason = error instanceof Error ? error.message.split('\n')[0] : String(error);
        console.warn(`[previews] Skipped ${site.name}: ${reason}`);
      }
    }
  }

  try {
    await Promise.all(
      Array.from({ length: Math.max(1, Math.min(concurrency, sites.length)) }, worker),
    );
  } finally {
    await browser.close();
  }

  await writeManifest(previews);
  console.log(`[previews] Wrote ${Object.keys(previews).length} of ${sites.length} previews`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
