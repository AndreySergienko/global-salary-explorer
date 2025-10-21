import { test, expect } from '@playwright/test'

test.describe('Map page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
  });

  test('Show map', async ({ page }) => {
    const map = page.locator('div[aria-label="Map"]')
    await expect(map).toBeVisible()
  })

  test('Check title and block tag', async ({ page }) => {
    const header = page.locator('div.page__header');
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
