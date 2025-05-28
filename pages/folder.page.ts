import { Locator, Page } from '@playwright/test'
import path from 'path'

export class FolderPage {
  homeButton: Locator
  renameFolderButton: Locator
  deleteFolderButton: Locator
  chooseFilesButton: Locator

  addFilesField: Locator

  actionMenu: Locator

  folderName: Locator
  folderOwnerText: Locator
  addFilesTitle: Locator
  dragFilesText: Locator

  files: Locator
  documents: Locator

  constructor(private page: Page) {
    this.homeButton = page.locator('button[name="documents--button-go-back"]')
    this.renameFolderButton = page.locator(
      'li[name="folder-menu--button-change-name"]'
    )
    this.deleteFolderButton = page.locator(
      'li[name="folder-menu--button-delete"]'
    )
    this.chooseFilesButton = page.locator(
      'button.btn.d-flex.flex-row.fs-unmask.btn-primary.ng-star-inserted'
    )

    this.addFilesField = page.locator('input[file-uploader--input-file]')

    this.actionMenu = page.locator('button[name="folder-menu--button-menu"]')

    this.folderName = page.locator('h3[name="folder-details--label-name"]')
    this.folderOwnerText = page.locator('p.folder-subtitle.ng-star-inserted')
    this.addFilesTitle = page.locator('h2').first() // TODO: check after adding files and documents
    this.dragFilesText = page.locator('div.drag-info')

    this.files = page.locator('sig-batch-document-item')
  }

  async uploadFile(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser')
    await this.chooseFilesButton.click()

    const fileChooser = await fileChooserPromise
    // await this.addFilesField.setInputFiles(path)
    await fileChooser.setFiles(path.join(__dirname, filePath))
    // await this.addFilesField.check()

    await this.page.waitForTimeout(3000)
  }

  async uploadFiles(paths: string[]): Promise<void> {}
}
