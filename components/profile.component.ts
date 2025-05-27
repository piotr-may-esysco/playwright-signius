import { Locator, Page } from '@playwright/test'

export class ProfileComponent {
  homeButton: Locator
  paymentCardButton: Locator
  invoiceDataButton: Locator
  advancedSignaturesButton: Locator
  qualifiedSignatures: Locator
  packageOverview: Locator

  constructor(private page: Page) {}
}
