import { Locator, Page } from '@playwright/test'
import { test, expect } from '@playwright/test'

export class LoginPage {
  emailInput: Locator
  passwordInput: Locator

  loginButton: Locator
  registerButton: Locator
  accessibilityButton: Locator
  forgotPassowrdButton: Locator
  googleAuthButton: Locator
  azureAuthButton: Locator
  keycloakAuthButton: Locator

  wrongCredentialsMessage: Locator

  emailLabel: Locator
  passwordLabel: Locator

  loginHeader: Locator

  constructor(private page: Page) {
    this.loginHeader = page.locator('h1').first() // alternative: page.getByRole('heading', { name: 'Zaloguj się' })

    this.emailInput = page.locator('input[name="login--input-email"]')
    this.passwordInput = page.locator('input[name="login--input-password"]')

    this.loginButton = page.locator('css=button[name="login--button-submit"]')
    this.registerButton = page.locator(
      'button[name="login--button-registration"]'
    )
    this.forgotPassowrdButton = page.locator(
      'button[name="login--button-change-password"]'
    )
    this.accessibilityButton = page
      .locator('button.outlined-accessibility-button')
      .first()

    this.wrongCredentialsMessage = page.locator('p.alert-message').first()

    this.emailLabel = page.locator('label').first()
    this.passwordLabel = page.locator('label').nth(1)

    this.googleAuthButton = page.locator('button').nth(4)
    this.azureAuthButton = page.locator('button').nth(5)
    this.keycloakAuthButton = page.locator('button').nth(6)
  }

  async validateFocusOnInput(input: Locator): Promise<void> {
    await input.click()
    await expect(input).toHaveCSS(
      'box-shadow',
      'rgba(56, 92, 219, 0.25) 0px 0px 8px 0px'
    )
  }

  async validateFocusOnButton(button: Locator): Promise<void> {
    // await button.focus({ timeout: 300 })

    await expect(button).toHaveCSS('outline', 'rgb(56, 92, 219) solid 2px')
    // await button.focus({ timeout: 300 })

    await expect(button).toHaveCSS('outline-color', 'rgb(56, 92, 219)')
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)

    await this.loginButton.click()
  }
}
