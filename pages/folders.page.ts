import { Locator, Page } from '@playwright/test'
import { NavbarComponent } from '../components/navbar.component'

export class FoldersPage {
  newFolderButton: Locator
  folders: Locator // TODO: check how multiple folders behave
  searchBox: Locator
  showMyFoldersSwitch: Locator
  findDocumentsButton: Locator

  navbar: NavbarComponent

  constructor(private page: Page) {
    this.newFolderButton = page.locator('sig-folder-add-button') //.first()
    this.folders = page.locator('sig-folder-item') // multiple objects possible

    this.searchBox = page.locator('sig-folder-search-input input').first()
    this.showMyFoldersSwitch = page.locator('input.sig-switch-input')
    this.findDocumentsButton = page.locator('button').nth(4) //TODO: add id to the object

    this.navbar = new NavbarComponent(page)
  }
}
