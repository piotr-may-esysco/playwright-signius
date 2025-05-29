import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { defaultUser1 } from '../test_data/users.data'
import { FoldersPage } from '../pages/folders.page'
import { FolderPage } from '../pages/folder.page'
import { getTextContent } from '../test_data/page-content.data'

test.describe('Folders tests', () => {
  let foldersPage: FoldersPage
  let textContent

  test.beforeEach(async ({ page }, testInfo) => {
    const language = testInfo.project.use.locale?.slice(0, 2)
    textContent = getTextContent(language ?? 'pl')
    await page.goto(page_data.urls.login)
    const loginPage = new LoginPage(page)
    await page.waitForLoadState('domcontentloaded')
    loginPage.login(defaultUser1.email, defaultUser1.password)
    foldersPage = new FoldersPage(page)
    testInfo.setTimeout(40000)
  })

  test('Create and delete a folder', async ({ page }) => {
    const folderName = 'testFolder'
    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    let folderPage = new FolderPage(page)
    await expect(folderPage.folderName).toHaveText(folderName)

    await page.goto(page_data.urls.folders)
    // await page.reload()
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(500)

    // foldersPage = new FoldersPage(page)
    // refresh page
    let foldersNames = await foldersPage.getFoldersNames()
    console.log(foldersNames)

    await expect(foldersNames).toContain(folderName)

    // clean-up
    await foldersPage.deleteFolder(folderName)
    await page.waitForTimeout(500)

    foldersNames = await foldersPage.getFoldersNames()
    await expect(foldersNames).not.toContain(folderName)
  })

  test('Upload single file into a folder', async ({ page }) => {
    // TODO: update when file in folder component is compleated
    const folderName = 'fileFolder'
    const filePath = '../documents-for-tests/4plik.pdf'
    const expectedProgressText = `1/1 ${textContent.DOCUMENTS.FILES}`

    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    const folderPage = new FolderPage(page)
    await folderPage.uploadFile(filePath)

    await expect
      .soft(folderPage.uploadProgressTitle)
      .toHaveText(textContent.DOCUMENTS.ADDING_DOCUMENTS)
    await expect
      .soft(folderPage.uploadProgressText)
      .toHaveText(expectedProgressText)

    await expect.soft(folderPage.files.first()).toHaveText(/4plik/)

    // clean-up
    await page.goto(page_data.urls.folders)
    await foldersPage.deleteFolder(folderName)
  })

  test('Upload multiple files into a folder', async ({ page }) => {
    // TODO: update when file in folder component is compleated
    // TODO: now working
    const folderName = 'fileFolder'
    const paths = [
      '../documents-for-tests/4plik.pdf',
      '../documents-for-tests/000.pdf',
      '../documents-for-tests/33plik33.pdf',
      '../documents-for-tests/AAA.pdf',
      '../documents-for-tests/innyplik.pdf',
    ]
    const expectedProgressText = `${paths.length}/${paths.length} ${textContent.DOCUMENTS.FILES}`

    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    const folderPage = new FolderPage(page)
    await folderPage.uploadFiles(paths)
    // const allTexts = await folderPage.files.all()

    await folderPage.uploadProgressModal.waitFor({ state: 'attached' })
    await expect
      .soft(folderPage.uploadProgressModal2)
      .toHaveCSS('background-color', 'rgb(119, 189, 31)')
    await expect
      .soft(folderPage.uploadProgressTitle)
      .toHaveText(textContent.DOCUMENTS.ADDING_DOCUMENTS)

    await expect
      .soft(folderPage.uploadProgressText)
      .toHaveText(expectedProgressText)
    // await folderPage.uploadProgressModal.waitFor({ state: 'attached' }) // TODO: check if this can be reomoved

    await expect.soft(folderPage.files.first()).toHaveText(/4plik/)
    await expect.soft(folderPage.files.last()).toHaveText(/innyplik/)

    // clean-up
    await page.goto(page_data.urls.folders)
    await foldersPage.deleteFolder(folderName)
  })

  //   test.afterAll(async ({ page }) => {
  //     // TODO: add removal of created folders
  //   })
})
