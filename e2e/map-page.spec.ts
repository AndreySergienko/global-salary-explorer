import { test, expect } from '@playwright/test'

test.describe('Map page', () => {
  test('должна отображать карту', async ({ page }) => {
    await page.goto('http://localhost:5173/') // твой dev URL
    const map = page.locator('div[aria-label="Map"]')
    await expect(map).toBeVisible()
    await expect(map).toHaveCSS('width', /px/)
    await expect(map).toHaveCSS('height', /px/)
  })

  // TODO
  // test('должен отображаться loader пока карта не загрузилась', async ({ page }) => {
  //   await page.goto('http://localhost:5173/')
  //   const loader = page.locator('text=Loading').first()
  //   await expect(loader).toBeVisible()
  // })
})
