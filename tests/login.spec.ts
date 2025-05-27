import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { loginPageDataPL } from '../test_data/login.data'
import { defaultUser1 } from '../test_data/users.data'

test.describe('login page tests PL', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    await page.goto(page_data.url)
    loginPage = new LoginPage(page)
    await page.waitForLoadState('domcontentloaded')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(page_data.title)
  })

  test('has correct texts', async ({ page }) => {
    await expect(loginPage.emailLabel).toHaveText(loginPageDataPL.emailLabel)
    await expect(loginPage.passwordLabal).toHaveText(
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

  test('check focus', async ({ page }) => {
    loginPage.validateFocusOnInput(loginPage.emailInput)
    loginPage.validateFocusOnInput(loginPage.passwordInput)

    loginPage.validateFocusOnButton(loginPage.loginButton)
    loginPage.validateFocusOnButton(loginPage.registerButton)
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

    await loginPage.passwordInput.fill('pass')

    await expect(loginPage.loginButton).toBeDisabled()

    await loginPage.emailInput.fill(defaultUser1.email)

    await expect(loginPage.loginButton).toBeEnabled()

    await loginPage.loginButton.click()

    // TODO: assert main page
  })

  test('check forgot password link', async ({ page }) => {
    await loginPage.forgotPassowrdLink.click()

    await expect(page).toHaveURL(
      'https://professional.signius.eu/#/password-change?email='
    )
  })

  test('check register button', async ({ page }) => {
    await loginPage.registerButton.click()

    await expect(page).toHaveURL(
      'https://professional.signius.eu/#/registration'
    )
  })
})
