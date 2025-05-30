import { Locator, Page } from '@playwright/test'

export class CoverPage {
  summaryHeader: Locator

  usersToCover: Locator

  signaturesSummary: Locator

  paymentOrCommisionButton: Locator

  constructor(private page: Page) {
    this.paymentOrCommisionButton = page.locator(
      'button[name="payment-details--button-send"]'
    )
  }
}
