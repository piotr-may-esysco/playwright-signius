import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { loginPageDataPL } from '../test_data/login.data'
import { defaultUser1, defaultUser2 } from '../test_data/users.data'

test.describe('login page tests PL', () => {
  // test.beforeEach(async ({ page }) => {
  //   await page.goto(page_data.url)
  //   const loginPage = new LoginPage(page)
  //   await page.waitForLoadState('domcontentloaded')
  // })

  test('2 users test', async ({ page, browser }) => {
    const context2 = await browser.newContext()
    const page2 = await context2.newPage()
    const loginPage1 = new LoginPage(page)
    await loginPage1.login(defaultUser1.email, defaultUser1.password)

    const loginPage2 = new LoginPage(page2)
    await loginPage2.login(defaultUser2.email, defaultUser2.password)

    await expect(page).toHaveURL('https://professional.signius.eu/#/')
    await expect(page2).toHaveURL('https://professional.signius.eu/#/')
  })
})
