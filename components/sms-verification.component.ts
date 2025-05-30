import { Locator, Page } from '@playwright/test'

export class SMSVerification {
  codeInput: Locator

  resendButton: Locator
  goBackButton: Locator

  phoneNumberText: Locator

  smsCodeLabel: Locator

  smsSendedHeader: Locator

  constructor(private page: Page) {
    // this.codeInput = page.locator('input[sms-auth--input-phone]') //pin-control
    this.codeInput = page.locator('.pin-control input') //pin-control

    this.smsSendedHeader = page.locator('h2').first()
  }
}
