import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { loginPageDataPL } from '../test_data/login.data'
import { defaultUser1 } from '../test_data/users.data'
import { FoldersPage } from '../pages/folders.page'

test.describe('login page tests PL', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    await page.goto(page_data.urls.login)
    loginPage = new LoginPage(page)
    await page.waitForLoadState('domcontentloaded')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(page_data.title)
  })

  test('has correct texts', async ({ page }) => {
    await expect(loginPage.emailLabel).toHaveText(loginPageDataPL.emailLabel)
    await expect(loginPage.passwordLabel).toHaveText(
      loginPageDataPL.passwordLabel
    )
    await expect(loginPage.loginButton).toHaveText(
      loginPageDataPL.loginButtonText
    )
    await expect(loginPage.registerButton).toHaveText(
      loginPageDataPL.registerButtonText
    )
    await expect(loginPage.loginHeader).toHaveText(loginPageDataPL.header)
  })

  test('incorrect email', async ({ page }) => {
    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.emailInput.fill('wrongmail@wp.pl')

    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.passwordInput.fill(defaultUser1.password)

    await expect(loginPage.loginButton).toBeEnabled()

    await loginPage.loginButton.click()

    await expect(loginPage.wrongCredentialsMessage).toHaveText(
      loginPageDataPL.wrongCredentials
    )
  })

  test('check hovers', async ({ page }) => {
    await loginPage.emailInput.fill(defaultUser1.email)
    await loginPage.passwordInput.fill(defaultUser1.password)

    await loginPage.loginButton.hover()
    await page.waitForTimeout(500)

    await expect(loginPage.loginButton).toHaveCSS(
      'background-color',
      'rgb(242, 73, 0)'
    )

    await loginPage.registerButton.hover()
    await page.waitForTimeout(500)

    await expect(loginPage.registerButton).toHaveCSS(
      'color',
      'rgb(255, 255, 255)'
    )

    await loginPage.forgotPassowrdButton.hover()
    await page.waitForTimeout(500)

    await expect(loginPage.forgotPassowrdButton).toHaveCSS(
      'color',
      'rgb(0, 0, 0)'
    )
  })

  test('check focus', async ({ page }) => {
    await loginPage.validateFocusOnInput(loginPage.emailInput)
    await loginPage.validateFocusOnInput(loginPage.passwordInput)

    await loginPage.emailInput.fill(defaultUser1.email)
    await loginPage.passwordInput.fill(defaultUser1.password)

    await page.waitForTimeout(500)

    await loginPage.validateFocusOnButton(
      loginPage.registerButton,
      'rgb(100, 98, 98)'
    )
    await loginPage.validateFocusOnButton(
      loginPage.accessibilityButton,
      'rgb(47, 46, 46)'
    )
    await loginPage.validateFocusOnButton(
      loginPage.forgotPassowrdButton,
      'rgb(56, 92, 219)'
    )
    await loginPage.validateFocusOnButton(
      loginPage.loginButton,
      'rgb(255, 255, 255)'
    )
  })

  test('incorrect password', async ({ page }) => {
    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.passwordInput.fill('pass')

    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.emailInput.fill(defaultUser1.email)

    await expect(loginPage.loginButton).toBeEnabled()

    await loginPage.loginButton.click()

    await expect(loginPage.wrongCredentialsMessage).toHaveText(
      loginPageDataPL.wrongCredentials
    )
  })

  test('positive path', async ({ page }) => {
    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.emailInput.fill(defaultUser1.email)

    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.passwordInput.fill(defaultUser1.password)

    await expect(loginPage.loginButton).toBeEnabled()

    await loginPage.loginButton.click()

    const foldersPage = new FoldersPage(page)

    await expect(foldersPage.navbar.userEmail).toHaveText(defaultUser1.email)
    await expect(foldersPage.navbar.userName).toHaveText(
      defaultUser1.names + ' ' + defaultUser1.surname
    )

    // TODO: assert main page
  })

  test('check forgot password link', async ({ page }) => {
    await loginPage.forgotPassowrdButton.click()

    await expect(page).toHaveURL(
      page_data.urls.basic + page_data.urls.forgotPassword
    )
  })

  test('check register button', async ({ page }) => {
    await loginPage.registerButton.click()

    await expect(page).toHaveURL(
      page_data.urls.basic + page_data.urls.registation
    )
  })
})
