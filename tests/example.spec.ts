import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page-data'

test.describe('login page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(page_data.url)

    await page.waitForLoadState('domcontentloaded')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(page_data.title)
  })
})
