import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { defaultUser1, defaultUser2, fakeUser } from '../test_data/users.data'
import { RegistrationPage } from '../pages/registstration.page'
import { getTextContent } from '../test_data/page-content.data'
import removeHTML from '../helpers/remove-html'
import { CommissioningPage } from '../pages/comissioning.page'
import { FolderPage } from '../pages/folder.page'
import { FoldersPage } from '../pages/folders.page'
import { CoverPage } from '../pages/cover.page'

test.describe('Commisioning Tests', () => {
  // let registrationPage: RegistrationPage
  let foldersPage: FoldersPage
  let textContent
  let language
  test.beforeEach(async ({ page }, testInfo) => {
    language = testInfo.project.use.locale?.slice(0, 2)
    textContent = getTextContent(language ?? 'pl')

    await page.goto(page_data.urls.login)
    const loginPage = new LoginPage(page)
    await loginPage.login(defaultUser1.email, defaultUser2.password)
    await page.waitForLoadState('domcontentloaded')
    foldersPage = new FoldersPage(page)
    testInfo.setTimeout(50000)
  })

  test.only('Commision document for 2 users', async ({ page }) => {
    const folderName = '2usersFolder'
    const paths = ['../documents-for-tests/4plik.pdf']

    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    const folderPage = new FolderPage(page)
    await folderPage.uploadFiles(paths, textContent.DOCUMENTS.FILES)

    await folderPage.continueButton.click()

    const commissioningPage = new CommissioningPage(page)
    await commissioningPage.advancedSignatureOption.click()
    await commissioningPage.graphicalReprezentaionOptions.first().click()

    await commissioningPage.addSignerForm.addMe()
    await commissioningPage.addAnotherSignerButton.click()
    await commissioningPage.addSignerForm.addSignerAdvanced(defaultUser2)

    await commissioningPage.summaryButton.click()

    const coverPage = new CoverPage(page)

    await expect
      .soft(coverPage.paymentOrCommisionButton)
      .toHaveText(' Przekaż do podpisu ')

    await coverPage.paymentOrCommisionButton.click()

    await expect
      .soft(
        page.locator('h2[name="document-list-item--status-label-in_progress"]')
      )
      .toHaveText(textContent.ENUM.SIGN_STATUS.IN_PROGRESS)

    await page.goto(page_data.urls.folders)
    await foldersPage.deleteFolder(folderName)
  })
})
