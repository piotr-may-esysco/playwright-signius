import { Locator, Page } from '@playwright/test'

export class AddFolderComponent {
  title: Locator
  nameLabel: Locator
  nameInput: Locator
  cancelButton: Locator
  confirmButton: Locator
  closeButton: Locator

  constructor(private page: Page) {
    this.title = page.locator('h1[name="folder-add-modal--label-name"]')
    this.nameLabel = page.locator('.form-group label').first()
    this.nameInput = page.locator('input[name="folder-add-modal--input-add"]')
    this.cancelButton = page.locator('button.modal-close-btn')
    this.confirmButton = page.locator(
      'button[name="folder-add-modal--button-save"]'
    )
    this.closeButton = page.locator('.modal-close.ng-star-inserted')
  }
}
