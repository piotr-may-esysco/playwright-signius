import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { defaultUser1 } from '../test_data/users.data'
import { FoldersPage } from '../pages/folders.page'
import { getTextContent } from '../test_data/page-content.data'
import { test, expect } from '@playwright/test'

test.describe('login page tests', () => {
  let loginPage: LoginPage
  let textContent
  test.beforeEach(async ({ page, locale }, testInfo) => {
    const language = testInfo.project.use.locale?.slice(0, 2)
    textContent = getTextContent(language ?? 'pl')

    await page.goto(page_data.urls.login)
    loginPage = new LoginPage(page)
    await page.waitForLoadState('domcontentloaded')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(page_data.title)
  })

  test('has correct texts', async ({ page }) => {
    await expect(loginPage.emailLabel).toHaveText(textContent.AUTH.EMAIL)
    await expect(loginPage.passwordLabel).toHaveText(textContent.AUTH.PASSWORD)
    await expect(loginPage.loginButton).toHaveText(textContent.AUTH.LOGIN)
    await expect(loginPage.registerButton).toHaveText(
      textContent.AUTH.CREATE_FREE_ACCOUNT
    )
    await expect(loginPage.forgotPassowrdButton).toHaveText(
      textContent.AUTH.FORGET_PASSWORD
    )
    await expect(loginPage.loginHeader).toHaveText(textContent.AUTH.LOGIN)
  })

  test('incorrect email', async ({ page }) => {
    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.emailInput.fill('wrongmail@wp.pl')

    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.passwordInput.fill(defaultUser1.password)

    await expect(loginPage.loginButton).toBeEnabled()

    await loginPage.loginButton.click()

    await expect(loginPage.wrongCredentialsMessage).toHaveText(
      textContent.AUTH.INVALID_CREDENTIALS
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

    await loginPage.passwordInput.press('Tab')
    await loginPage.validateFocusOnButton(loginPage.forgotPassowrdButton)
    await loginPage.forgotPassowrdButton.press('Tab')
    await loginPage.validateFocusOnButton(loginPage.loginButton)
    await loginPage.loginButton.press('Tab')

    await loginPage.validateFocusOnButton(loginPage.registerButton)
    await loginPage.registerButton.press('Tab')
    await loginPage.validateFocusOnButton(loginPage.googleAuthButton)
    await loginPage.googleAuthButton.press('Tab')
    await loginPage.validateFocusOnButton(loginPage.azureAuthButton)
    await loginPage.azureAuthButton.press('Tab')
    await loginPage.validateFocusOnButton(loginPage.keycloakAuthButton)
    await loginPage.keycloakAuthButton.press('Tab')
    await loginPage.validateFocusOnButton(loginPage.accessibilityButton)
  })

  test('incorrect password', async ({ page }) => {
    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.passwordInput.fill('pass')

    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.emailInput.fill(defaultUser1.email)

    await expect(loginPage.loginButton).toBeEnabled()

    await loginPage.loginButton.click()

    await expect(loginPage.wrongCredentialsMessage).toHaveText(
      textContent.AUTH.INVALID_CREDENTIALS
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
      defaultUser1.firstName + ' ' + defaultUser1.lastName
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
