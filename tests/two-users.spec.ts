import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { loginPageDataPL } from '../test_data/login.data'
import { defaultUser1, defaultUser2 } from '../test_data/users.data'

test.describe('two users tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(page_data.urls.basic)
    await page.waitForLoadState('domcontentloaded')
  })

  test('simple 2 users test', async ({ page, browser }) => {
    // Creating new session for secound user
    const context2 = await browser.newContext()
    const page2 = await context2.newPage()
    await page2.goto(page_data.urls.basic)
    await page2.waitForLoadState('domcontentloaded')

    const loginPage1 = new LoginPage(page)
    await loginPage1.login(defaultUser1.email, defaultUser1.password)

    const loginPage2 = new LoginPage(page2)
    await loginPage2.login(defaultUser2.email, defaultUser2.password)

    const correctFoldersUrl = page_data.urls.basic + page_data.urls.folders

    await expect(page).toHaveURL(correctFoldersUrl)
    await expect(page2).toHaveURL(correctFoldersUrl)
  })
})
