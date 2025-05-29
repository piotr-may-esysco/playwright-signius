import { Locator, Page } from '@playwright/test'

export class Comissioning {
  goBackButton: Locator
  findOutMoreButton: Locator
  addAnotherSignerButton: Locator
  addMessageButton: Locator
  summaryButton: Locator

  documentCount: Locator

  messageInput: Locator

  typeOfSignatureHeader: Locator
  graphicalReprezentationHeader: Locator
  signersHeader: Locator

  advancedSignatureOption: Locator
  qualifiedSignatureOption: Locator

  graphicalReprezentaionOptions: Locator

  orderOfSigningSwitch: Locator

  addSignerForm: Locator

  constructor(private page: Page) {
    this.goBackButton = page.locator('button.go-back-btn')
    // this.findOutMoreButton = page.locator() //TODO: add when it will have id
    this.addAnotherSignerButton = page.locator(
      'button[name="contacts--button-add-another"]'
    )
    this.summaryButton = page.locator(
      'button[name="documents--button-summary"]'
    )

    this.advancedSignatureOption = page.locator(
      'div[name="signature-type--button-easy"]'
    )
    this.qualifiedSignatureOption = page.locator(
      'div[name="ssignature-type--button-qual"]'
    )

    this.graphicalReprezentaionOptions = page.locator('.add-page__box')

    this.documentCount = page.locator('sig-alert').first()

    this.typeOfSignatureHeader = page.locator('h2').first()
    this.graphicalReprezentationHeader = page.locator('h2').nth(1)
    this.signersHeader = page.locator('h2').nth(2)

    this.orderOfSigningSwitch = page.locator('sig-switch')

    // TODO: add people form
  }
}
