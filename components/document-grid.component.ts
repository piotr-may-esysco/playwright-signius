import { Locator } from '@playwright/test'

export class DocumentGrid {
  documentStatus: Locator
  signatureType: Locator

  signersButton: Locator
  optionsButton : Locator

  signCheckbox: Locator

  signCheckboxLabel: Locator

  documentThumbnail: Locator

  commissionData: Locator

  commissionerLabel: Locator

  constructor(private documentLocator: Locator) {
    this.commissionData = documentLocator.locator('.creation-date')
    this.commissionerLabel = documentLocator.locator(
      '.document-info-container__header div'
    )
  }
}
