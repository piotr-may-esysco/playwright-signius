import { Locator, Page } from '@playwright/test'
import path from 'path'

export class FolderPage {
  homeButton: Locator
  renameFolderButton: Locator
  deleteFolderButton: Locator
  chooseFilesButton: Locator
  cancelUploadButton: Locator

  addFilesField: Locator

  actionMenu: Locator

  folderName: Locator
  folderOwnerText: Locator
  addFilesTitle: Locator
  dragFilesText: Locator
  uploadProgressText: Locator
  uploadProgressTitle: Locator

  uploadProgressModal: Locator
  uploadProgressModal2: Locator

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

    this.uploadProgressModal = page.locator('.complete-modal')
    this.uploadProgressModal2 = page.locator('.complete-modal')
    this.uploadProgressText = this.uploadProgressModal.locator('p')
    this.uploadProgressTitle = this.uploadProgressModal.locator('h4')

    this.files = page.locator('sig-batch-document-item')
  }

  async uploadFile(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser')
    await this.chooseFilesButton.click()

    const fileChooser = await fileChooserPromise
    // await this.addFilesField.setInputFiles(path)
    await fileChooser.setFiles(path.join(__dirname, filePath))
    console.log(path.join(__dirname, filePath))

    // await this.addFilesField.check()

    // await this.page.waitForTimeout(3000)
  }

  async uploadFiles(paths: string[]): Promise<void> {
    for (let i = 0; i < paths.length; i++) {
      paths[i] = path.join(__dirname, paths[i])
      // console.log(paths[i])
    }

    const fileChooserPromise = this.page.waitForEvent('filechooser')
    await this.chooseFilesButton.click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(paths)
  }
}
