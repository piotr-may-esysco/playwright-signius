import { Locator, Page } from '@playwright/test'

export class SignaturesBarComponent {
  advancedSignatures: Locator
  qualifiedSignatures: Locator

  mySignaturesText: Locator

  toogleBarButton: Locator

  constructor(private page: Page) {
    this.advancedSignatures = page.locator('#easy')
    this.qualifiedSignatures = page.locator('#qualified')

    this.mySignaturesText = page.locator('.dashboard-bar__text p')

    this.toogleBarButton = page.locator('.dashboard-bar__arrow')
  }

  async toggle(): Promise<void> {
    await this.toogleBarButton.click()
  }
}
