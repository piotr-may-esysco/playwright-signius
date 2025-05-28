import { Locator, Page } from '@playwright/test'

export class DeleteFolderComponent {
  title: Locator
  nameLabel: Locator
  cancelButton: Locator
  confirmButton: Locator
  closeButton: Locator

  constructor(private page: Page) {
    this.title = page.locator('h1[name="folder-delete-modal--label-name"]')
    this.nameLabel = page.locator('.modal-subtitle.ng-star-inserted div')
    this.cancelButton = page.locator('button.btn-cancel')
    this.confirmButton = page.locator(
      'button[name="folder-delete-modal--button-delete"]'
    )
    this.closeButton = page.locator('.modal-close.ng-star-inserted')
  }
}
