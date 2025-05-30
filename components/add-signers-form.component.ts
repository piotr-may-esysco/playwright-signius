import { Locator, Page } from '@playwright/test'
import { TestUser } from '../test_data/users.data'

export class AddSignersForm {
  saveButton: Locator
  cancelButton: Locator
  addMeButton: Locator

  emailInput: Locator
  phoneNumerInput: Locator
  firstNameInput: Locator
  lastNameInput: Locator

  countrySelector: Locator

  emailLabel: Locator
  phoneNumerLabel: Locator
  firstNameLabel: Locator
  lastNameLabel: Locator

  constructor(private page: Page) {
    this.emailInput = page
      .locator('input[name="contact-item--input-email"]')
      .last()
    this.phoneNumerInput = page.locator('sig-phone-input input').last()
    this.firstNameInput = page
      .locator('input[name="contact-item--input-name"]')
      .last()
    this.lastNameInput = page
      .locator('input[name="contact-item--input-surname"]')
      .last()

    this.countrySelector = page.locator('.dropdown-toggle').last()

    this.cancelButton = page
      .locator('.fs-unmask.btn-outline-faint.btn-sm')
      .last() // TODO: change when id or name added
    this.addMeButton = page
      .locator('button[name="contact-form--button-add-me"]')
      .last()
    this.saveButton = page
      .locator('button[name="contact-form--button-save-changes"]')
      .last()
  }

  async selectCounty(country: string): Promise<void> {
    await this.countrySelector.click()
    const id = `#iti-0__item-${country}-preferred`
    await this.page.locator(id).last().click()
  }

  async addMe(): Promise<void> {
    await this.addMeButton.click()
  }

  async addSignerAdvanced(user: TestUser): Promise<void> {
    await this.selectCounty(user.country)

    await this.emailInput.fill(user.email)
    await this.phoneNumerInput.fill(user.phoneNumber)
    await this.firstNameInput.fill(user.firstName)
    await this.lastNameInput.fill(user.lastName)

    await this.saveButton.click()
  }
}
