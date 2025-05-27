import { Locator, Page } from '@playwright/test'

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
}
