import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { defaultUser1, defaultUser2, fakeUser } from '../test_data/users.data'
import { RegistrationPage } from '../pages/registstration.page'
import { getTextContent } from '../test_data/page-content.data'
import removeHTML from '../helpers/remove-html'
import { CommissioningPage } from '../pages/commissioning.page'
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

  test('Commision document for 2 users Advanced', async ({ page }) => {
    const folderName = '2usersFolder'
    const paths = ['../documents-for-tests/4plik.pdf']
    const beforeSignaturesQuantity = Number(
      await foldersPage.signaturesBar.advancedSignatures.textContent()
    )
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
      .soft(coverPage.commisionButton)
      .toHaveText(' Przekaż do podpisu ')

    await coverPage.commisionButton.click()

    await expect
      .soft(
        page.locator('h2[name="document-list-item--status-label-in_progress"]')
      )
      .toHaveText(textContent.ENUM.SIGN_STATUS.IN_PROGRESS)

    await page.goto(page_data.urls.folders)

    const afterSignaturesQuantity = Number(
      await foldersPage.signaturesBar.advancedSignatures.textContent()
    )
    expect(afterSignaturesQuantity).toEqual(beforeSignaturesQuantity - 2)
    await foldersPage.deleteFolder(folderName)
  })

  test('Commision 2 documents for 3 users using method Advanced', async ({
    page,
    browser,
  }) => {
    const folderName = '3usersMethodFolder'
    const paths = [
      '../documents-for-tests/4plik.pdf',
      '../documents-for-tests/000.pdf',
    ]
    const signers = [defaultUser2, fakeUser]
    const beforeSignaturesQuantity = Number(
      await foldersPage.signaturesBar.advancedSignatures.textContent()
    )
    await foldersPage.performFullComissionAdvanced(
      paths,
      signers,
      true,
      folderName,
      language
    )

    const context2 = await browser.newContext()
    const page2 = await context2.newPage()
    await page2.goto(page_data.urls.basic)
    const loginPage2 = new LoginPage(page2)
    await loginPage2.login(defaultUser2.email, defaultUser2.password)
    const foldersPage2 = new FoldersPage(page2)
    await foldersPage2.folders
      .locator('p[name="folder-item--label-name"]')
      .filter({ hasText: folderName })
      .first()
      .click()
    await expect
      .soft(
        page2
          .locator('h2[name="document-list-item--status-label-in_progress"]')
          .first()
      )
      .toHaveText(textContent['ENUM'].SIGN_STATUS.IN_PROGRESS)

    await page.goto(page_data.urls.folders)
    const afterSignaturesQuantity = Number(
      await foldersPage.signaturesBar.advancedSignatures.textContent()
    )
    await expect(afterSignaturesQuantity).toEqual(beforeSignaturesQuantity - 6)
    await foldersPage.deleteFolder(folderName)
  })

  test('Commission document for 2 users Qualified', async ({ page }) => {
    const folderName = '2usersQFolder'
    const paths = ['../documents-for-tests/4plik.pdf']
    const beforeSignaturesQuantity = Number(
      await foldersPage.signaturesBar.qualifiedSignatures.textContent()
    )
    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    const folderPage = new FolderPage(page)
    await folderPage.uploadFiles(paths, textContent.DOCUMENTS.FILES)

    await folderPage.continueButton.click()

    const commissioningPage = new CommissioningPage(page)
    await commissioningPage.qualifiedSignatureOption.click()
    await commissioningPage.graphicalReprezentaionOptions.first().click()

    await commissioningPage.addSignerForm.addMe()
    await commissioningPage.addAnotherSignerButton.click()
    await commissioningPage.addSignerForm.addSignerQualified(defaultUser2)

    await commissioningPage.summaryButton.click()

    const coverPage = new CoverPage(page)

    await expect
      .soft(coverPage.commisionButton)
      .toHaveText(' Przekaż do podpisu ')

    await coverPage.commisionButton.click()

    await expect
      .soft(
        page.locator('h2[name="document-list-item--status-label-in_progress"]')
      )
      .toHaveText(textContent.ENUM.SIGN_STATUS.IN_PROGRESS)

    await page.goto(page_data.urls.folders)

    const afterSignaturesQuantity = Number(
      await foldersPage.signaturesBar.qualifiedSignatures.textContent()
    )
    expect(afterSignaturesQuantity).toEqual(beforeSignaturesQuantity - 2)
    await foldersPage.deleteFolder(folderName)
  })
})
