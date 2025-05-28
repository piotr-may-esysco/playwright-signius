import { Locator, Page } from '@playwright/test'
import { NavbarComponent } from '../components/navbar.component'
import { AddFolderComponent } from '../components/add-folder.component'
import { DeleteFolderComponent } from '../components/delete-folder.component'

export class FoldersPage {
  folders: Locator // TODO: check how multiple folders behave
  searchBox: Locator
  showMyFoldersSwitch: Locator
  findDocumentsButton: Locator
  newFolderButton: Locator

  navbar: NavbarComponent

  constructor(private page: Page) {
    this.newFolderButton = page.locator('sig-folder-add-button') //.first()
    this.folders = page.locator('sig-folder-item') // multiple objects possible

    this.searchBox = page.locator('sig-folder-search-input input').first()
    this.showMyFoldersSwitch = page.locator('input.sig-switch-input')
    this.findDocumentsButton = page.locator('button').nth(4) //TODO: add id to the object

    this.navbar = new NavbarComponent(page)
  }

  async createFolder(folderName: string): Promise<void> {
    await this.newFolderButton.click()
    const addFolderForm = new AddFolderComponent(this.page)
    await addFolderForm.nameInput.fill(folderName)
    await addFolderForm.confirmButton.click()
  }

  async deleteFolder(folderName: string): Promise<void> {
    try {
      await this.page // TODO move this to getFolder function
        .locator('sig-folder-item')
        .filter({ hasText: folderName })
        .locator('button[name="folder-menu--button-menu"]')
        .click()

      await this.page.locator('li[name="folder-menu--button-delete"]').click()

      const deleteFolderDialog = new DeleteFolderComponent(this.page)
      deleteFolderDialog.confirmButton.click()
    } catch {
      console.log('Folder: ' + folderName + ' not found')
    }
  }

  async getFoldersNames(): Promise<string[]> {
    const result: string[] = []
    const folders = await this.folders.allInnerTexts()
    for (let folder of folders) {
      const folderName = folder.split('\n\n')[1]
      result.push(folderName)
    }
    return result
  }
}
