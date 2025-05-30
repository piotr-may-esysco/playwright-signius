import { Locator, Page } from '@playwright/test'

export class DataChangedSettingsForm {
  // TODO: add labels
  phoneInput: Locator
  firstNameInput: Locator
  lastNameInput: Locator

  phoneLabel: Locator
  firstNameLabel: Locator
  lastNameLabel: Locator

  countrySelector: Locator

  qualifiedSignatureText: Locator
  qualifiedSingaturesButton: Locator

  verifyIdentityText: Locator
  verifyIdentityButton: Locator

  dataChangedButton: Locator
  saveChangesButton: Locator
  cancelButton: Locator

  constructor(private page: Page) {
    this.firstNameInput = page.locator(
      'input[name="profile-account--input-firstname"]'
    )
    this.lastNameInput = page.locator(
      'input[name="profile-account--input-lastname"]'
    )
    this.phoneInput = page.locator(
      'sig-phone-input[name="profile-account--input-phone"] input'
    )

    this.countrySelector = page.locator('.dropdown-toggle').first()

    this.firstNameInput = page.locator('.form-group label').nth(3)
    this.lastNameLabel = page.locator('.form-group label').nth(4)
    this.phoneLabel = page.locator('.form-group label').nth(5)

    this.verifyIdentityText = page.locator(
      '.profile-account-personal-data__ver p'
    )
    this.verifyIdentityButton = page.locator('button.ng-star-inserted').nth(1) // TODO: edit when added id
    this.qualifiedSingaturesButton = page.locator(
      '.profile-account-personal-data__ver ng-star-inserted button'
    ) // TODO: edit when added id

    this.dataChangedButton = page.locator(
      'button[name="profile-account--button-data-changed"]'
    )
    this.saveChangesButton = page.locator(
      'button[name="profile-account--button-save-changes"]'
    )
    this.cancelButton = page.locator('button.ng-star-inserted').nth(2) // TODO: edit when added id
  }

  async selectCounty(country: string): Promise<void> {
    await this.countrySelector.click()
    const id = `#iti-0__item-${country}-preferred`
    await this.page.locator(id).first().click()
  }
}
