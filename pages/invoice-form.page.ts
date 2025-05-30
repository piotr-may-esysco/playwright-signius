import { Locator, Page } from '@playwright/test'

export class InvoiceData {
  invoiceDataHeader: Locator

  NIPNumberInput: Locator
  nameInput: Locator
  addressInput: Locator
  postCodeInput: Locator
  cityInput: Locator

  cancelButton: Locator
  saveButton: Locator
  changeInvoiceData: Locator

  invoiceAfterPaymentCheckbox: Locator

  constructor(private page: Page) {}
}
