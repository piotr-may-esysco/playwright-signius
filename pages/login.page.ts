import { Locator, Page } from '@playwright/test'
import { test, expect } from '@playwright/test'

export class LoginPage {
  emailInput: Locator
  passwordInput: Locator

  loginButton: Locator
  registerButton: Locator

  wrongCredentialsMessage: Locator

  forgotPassowrdLink: Locator

  emailLabel: Locator
  passwordLabal: Locator

  loginHeader: Locator

  constructor(private page: Page) {}

  async validateFocusOnInput(input: Locator): Promise<void> {
    await input.focus()

    await expect(input).toHaveCSS('border-color', '#385cdb !important')
    await expect(input).toHaveCSS('box-shadow', '0 0 8px #385cdb40')
  }

  async validateFocusOnButton(button: Locator): Promise<void> {
    await button.focus()

    await expect(button).toHaveCSS('outline', '2px solid #385cdb !important')
    await expect(button).toHaveCSS('box-shadow', '0 0 8px #385cdb40')
  }
}
