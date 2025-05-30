import { Locator, Page } from '@playwright/test'
import { test, expect } from '@playwright/test'
import { strict } from 'assert'

export class RegistrationPage {
  emailInput: Locator
  phoneInput: Locator
  firstNameInput: Locator
  lastNameInput: Locator
  passwordInput: Locator
  termsCheckbox: Locator

  registerButton: Locator
  accessibilityButton: Locator
  showPasswordButton: Locator

  countrySelector: Locator

  passwordRequirements: Locator

  loginLink: Locator
  terms1Link: Locator
  terms2Link: Locator

  emailLabel: Locator
  phoneLabel: Locator
  firstNameLabel: Locator
  lastNameLabel: Locator
  passwordLabel: Locator

  registerHeader: Locator
  registerText: Locator
  cookiesText: Locator

  constructor(private page: Page) {
    this.registerHeader = page.locator('h1').first()
    this.registerText = page.locator('span.subtitle').first()
    this.cookiesText = page.locator('p.terms')
    this.loginLink = this.registerText.locator('a')

    this.emailInput = page.locator('input[name="registration--input-email"]')
    this.phoneInput = page.locator(
      'sig-phone-input[name="registration--phoneNumber-component"] input'
    )
    this.firstNameInput = page.locator(
      'input[name="registration--input-firstName"]'
    )
    this.lastNameInput = page.locator(
      'input[name="registration--input-lastName"]'
    )
    this.passwordInput = page.locator(
      'input[name="registration--input-password"]'
    )
    this.termsCheckbox = page.locator(
      'input[name="registration--checkbox-terms"]'
    )

    this.countrySelector = page.locator('.dropdown-toggle')

    this.registerButton = page.locator(
      'css=button[name="registration--button-submit"]'
    )

    this.accessibilityButton = page
      .locator('button.outlined-accessibility-button')
      .first()

    this.showPasswordButton = page.locator('.visibility-button')

    this.passwordRequirements = page.locator('sig-password-rule-indicator') // Multiple elements

    this.emailLabel = page.locator('label').first()
    this.phoneLabel = page.locator('label').nth(1)
    this.firstNameLabel = page.locator('label').nth(2)
    this.lastNameLabel = page.locator('label').nth(3)
    this.passwordLabel = page.locator('label').nth(4)

    this.terms1Link = this.page.locator('sig-checkbox a')
    this.terms2Link = this.cookiesText.locator('a')
  }

  async validateFocusOnInput(input: Locator): Promise<void> {
    await input.click()
    await expect(input).toHaveCSS(
      'box-shadow',
      'rgba(56, 92, 219, 0.25) 0px 0px 8px 0px'
    )
  }

  async validateFocusOnButton(button: Locator): Promise<void> {
    await expect(button).toHaveCSS('outline-color', 'rgb(56, 92, 219)')
  }

  async selectCounty(country: string): Promise<void> {
    await this.countrySelector.click()
    const id = `#iti-0__item-${country}-preferred`
    await this.page.locator(id).first().click()
  }

  async fillRegisterForm(
    email: string,
    phoneNumber: string,
    country: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<void> {
    await this.emailInput.fill(email)
    await this.selectCounty(country)

    await this.phoneInput.fill(phoneNumber)
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.passwordInput.fill(password)
    await this.termsCheckbox.check()
  }
}
