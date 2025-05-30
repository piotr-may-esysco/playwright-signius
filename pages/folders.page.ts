import { Locator, Page, expect } from '@playwright/test'
import { NavbarComponent } from '../components/navbar.component'
import { AddFolderComponent } from '../components/add-folder.component'
import { DeleteFolderComponent } from '../components/delete-folder.component'
import { defaultUser2, TestUser } from '../test_data/users.data'
import { FolderPage } from './folder.page'
import { getTextContent } from '../test_data/page-content.data'
import { CommissioningPage } from './commissioning.page'
import { CoverPage } from './cover.page'
import { SignaturesBarComponent } from '../components/signatures-bar.componan'

export class FoldersPage {
  folders: Locator // TODO: check how multiple folders behave
  searchBox: Locator
  showMyFoldersSwitch: Locator
  findDocumentsButton: Locator
  newFolderButton: Locator

  navbar: NavbarComponent
  signaturesBar: SignaturesBarComponent

  constructor(private page: Page) {
    this.newFolderButton = page.locator('sig-folder-add-button') //.first()
    this.folders = page.locator('sig-folder-item') // multiple objects possible .folder-item
    // this.folders = page.locator('.folder-item') // multiple objects possible .folder-item

    this.searchBox = page.locator('sig-folder-search-input input').first()
    this.showMyFoldersSwitch = page.locator('input.sig-switch-input')
    this.findDocumentsButton = page.locator('button').nth(4) // TODO: add id to the object

    this.navbar = new NavbarComponent(page)
    this.signaturesBar = new SignaturesBarComponent(page)
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
        .first()
        .click()

      await this.page.locator('li[name="folder-menu--button-delete"]').click()

      const deleteFolderDialog = new DeleteFolderComponent(this.page)
      await deleteFolderDialog.confirmButton.click()
    } catch {
      console.log('Folder: ' + folderName + ' not found')
    }
  }

  async getFoldersNames(): Promise<string[]> {
    const result: string[] = []
    const folders = await this.folders.allInnerTexts()
    console.log(folders)

    for (let folder of folders) {
      const folderName = folder.split('\n\n')[1]
      result.push(folderName)
    }
    return result
  }

  /**  This method performs full commission of files to the users.
   * User must be logged in to perform this action.
   * @param filePaths - document paths for signing
   * @param signers - all users (except commissioner) that will have to sign the documents.
   * @param currentUserIncluded - if current user should be added in signers list
   * @param folderName - name of new folder where documents will be added
   * @param language - browser language for text verification
   */
  async performFullComissionAdvanced(
    filePaths: string[],
    signers: TestUser[],
    currentUserIncluded: boolean,
    folderName: string,
    language: string,
    graphicalReprezentaionOption?: number
  ): Promise<void> {
    // TODO: add graphical representation options
    const paths = ['../documents-for-tests/4plik.pdf']
    await this.createFolder(folderName)
    await this.page.waitForTimeout(500)

    let textContent = getTextContent(language)
    const folderPage = new FolderPage(this.page)
    await folderPage.uploadFiles(paths, textContent['DOCUMENTS'].FILES)

    await folderPage.continueButton.click()

    const commissioningPage = new CommissioningPage(this.page)
    await commissioningPage.advancedSignatureOption.click()
    await commissioningPage.chooseGraphicalRepresentationOption(
      graphicalReprezentaionOption ?? 1
    )

    if (currentUserIncluded) {
      await commissioningPage.addSignerForm.addMe()
    }

    for (let signer of signers) {
      await commissioningPage.addAnotherSignerButton.click()
      await commissioningPage.addSignerForm.addSignerAdvanced(signer)
    }

    await commissioningPage.summaryButton.click()

    const coverPage = new CoverPage(this.page)

    await coverPage.commisionButton.click()

    await expect
      .soft(
        this.page.locator(
          'h2[name="document-list-item--status-label-in_progress"]'
        )
      )
      .toHaveText(textContent['ENUM'].SIGN_STATUS.IN_PROGRESS)
  }

  /**  This method performs full commission of files to the users.
   * User must be logged in to perform this action.
   * @param filePaths - document paths for signing
   * @param signers - all users (except commissioner) that will have to sign the documents.
   * @param currentUserIncluded - if current user should be added in signers list
   * @param folderName - name of new folder where documents will be added
   * @param language - browser language for text verification
   */
  async performFullComissionQualified(
    filePaths: string[],
    signers: TestUser[],
    currentUserIncluded: boolean,
    folderName: string,
    language: string,
    graphicalReprezentaionOption?: number
  ): Promise<void> {
    // TODO: add graphical representation options
    const paths = ['../documents-for-tests/4plik.pdf']
    await this.createFolder(folderName)
    await this.page.waitForTimeout(500)

    let textContent = getTextContent(language)
    const folderPage = new FolderPage(this.page)
    await folderPage.uploadFiles(paths, textContent['DOCUMENTS'].FILES)

    await folderPage.continueButton.click()

    const commissioningPage = new CommissioningPage(this.page)
    await commissioningPage.qualifiedSignatureOption.click()
    await commissioningPage.chooseGraphicalRepresentationOption(
      graphicalReprezentaionOption ?? 1
    )

    if (currentUserIncluded) {
      await commissioningPage.addSignerForm.addMe()
    }

    for (let signer of signers) {
      await commissioningPage.addAnotherSignerButton.click()
      await commissioningPage.addSignerForm.addSignerQualified(signer)
    }

    await commissioningPage.summaryButton.click()

    const coverPage = new CoverPage(this.page)

    await coverPage.commisionButton.click()

    await expect
      .soft(
        this.page.locator(
          'h2[name="document-list-item--status-label-in_progress"]'
        )
      )
      .toHaveText(textContent['ENUM'].SIGN_STATUS.IN_PROGRESS)
  }
}
