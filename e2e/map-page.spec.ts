import { test, expect } from '@playwright/test'
import type { Worker as PWWorker } from 'playwright';

test.describe('Map page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('load');
  });

  test('Show map', async ({ page }) => {
    const map = page.locator('div[aria-label="Map"]')
    await expect(map).toBeVisible()
  })

  test('Check title and block tag', async ({ page }) => {
    const header = page.locator('header.page__header');
    await expect(header).toBeVisible();

    const title = header.locator('h1.page__title');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText(/^$/);

    const h1ByRole = page.getByRole('heading', { level: 1 });
    await expect(h1ByRole).toBeVisible();
  });

  test('Check subtitle', async ({ page }) => {
    const subtitles = page.locator('.page__header .page__subtitle');
    await expect(subtitles).toHaveCount(2);

    await expect(subtitles.nth(0)).toBeVisible();
    await expect(subtitles.nth(0)).not.toHaveText(/^$/);

    await expect(subtitles.nth(1)).toBeVisible();
    await expect(subtitles.nth(1)).not.toHaveText(/^$/);

    const italic = subtitles.nth(1).locator('i');
    await expect(italic).toBeVisible();
    await expect(italic).not.toHaveText(/^$/);
  });

  test('Correct indicators and tags', async ({ page }) => {
    const legend = page.locator('.page__header .page__legend-hint');
    await expect(legend).toBeVisible();

    const dots = legend.locator('.page__dot');
    await expect(dots).toHaveCount(2);

    const lowDot = legend.locator('.page__dot.page__dot--low');
    const highDot = legend.locator('.page__dot.page__dot--high');
    await expect(lowDot).toBeVisible();
    await expect(highDot).toBeVisible();

    await expect(lowDot).toHaveAttribute('aria-hidden', 'true');
    await expect(highDot).toHaveAttribute('aria-hidden', 'true');

    await expect(lowDot).not.toHaveAttribute('tabindex', /.*/);
    await expect(highDot).not.toHaveAttribute('tabindex', /.*/);

    const sep = legend.locator('.page__sep');
    await expect(sep).toBeVisible();
    await expect(sep).not.toHaveText(/^$/);
  });
})

test.describe('Check worker', () => {
  test('Check get data web-worker', async ({ page }) => {
    const workerPromise = new Promise<PWWorker>((resolve) => {
      page.on('worker', (w) => resolve(w));
    });

    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('load');

    const worker = await workerPromise

    const data = await worker.evaluate(() => {
      return new Promise<Array<{ paths: string[], fillColor: string }>>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('worker did not post result in time')), 5000);

        const orig = self.postMessage.bind(self);
        self.postMessage = (data) => {
          clearTimeout(timeout);
          resolve(data);
          orig(data);
          self.postMessage = orig;
        };
      });
    })

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const first = data[0];
    expect(first).toHaveProperty('paths');
    expect(first).toHaveProperty('fillColor');

    const paths = first.paths;
    expect(paths && (Array.isArray(paths) ? paths.length : String(paths).length)).toBeGreaterThan(0);

    const color = String(first.fillColor);
    expect(
      /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color) ||
      /^rgba?\(/i.test(color)
    ).toBe(true);
  });
})
