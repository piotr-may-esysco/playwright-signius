import { Locator, Page } from '@playwright/test'

export class AccountPage {
  // TODO: header and labels locators

  emailAddressField: Locator

  graphicalReprezentation: Locator

  createNewPasswordButton: Locator
  changeReprezentationButton: Locator
  deleteAccountButton: Locator

  languageSelector: Locator

  autoDeleteDocumentsSwitch: Locator

  autoDeleteDocumentsLabel: Locator
  autoDeleteDocumentsText: Locator
  deleteAccountTextBigger: Locator
  deleteAccountTextSmaller: Locator

  personalDataForm: Locator // TODO: create component

  constructor(private page: Page) {
    this.emailAddressField = page.locator(
      'input[name="profile-account--input-email"]'
    )

    this.createNewPasswordButton = page.locator(
      'button[name="profile-account--button-change-password"]'
    )
    this.changeReprezentationButton = page.locator(
      '.change-signature__actions-button button'
    )

    this.languageSelector = page.locator(
      'ng-select[name="profile-account--dropdown-lang"]'
    )

    this.autoDeleteDocumentsSwitch = page.locator('input.sig-switch-input')

    this.graphicalReprezentation = page
      .locator('.change-signature__actions-signature')
      .first()

    this.autoDeleteDocumentsLabel = page.locator('.sig-switch-label h3')
    this.autoDeleteDocumentsText = page.locator('span.ng-star-inserted').nth(1)
    this.deleteAccountTextBigger = page.locator(
      '.settings-section--delete-account p'
    )
    this.deleteAccountTextSmaller = this.deleteAccountTextBigger.locator('span')
  }
}
