import { Locator, Page } from '@playwright/test'

export class CoverPage {
  summaryHeader: Locator

  usersToCover: Locator

  signaturesSummary: Locator

  commisionButton: Locator
  buyMoreButton: Locator
  packageSelectors: Locator

  signersBoxes : Locator

  constructor(private page: Page) {
    this.commisionButton = page.locator(
      'button[name="payment-details--button-send"]'
    )

    this.buyMoreButton = page.locator('.buy-more-button')

    this.packageSelectors = page.locator('sig-qualified-product-item-content')
    this.signersBoxes = page.locator('sig-signers-payment-selection-item')
  }
}
