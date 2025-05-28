import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { loginPageDataPL } from '../test_data/login.data'
import { defaultUser1 } from '../test_data/users.data'
import { FoldersPage } from '../pages/folders.page'
import { FolderPage } from '../pages/folder.page'

test.describe('login page tests PL', () => {
  let foldersPage: FoldersPage
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(page_data.urls.login)
    const loginPage = new LoginPage(page)
    await page.waitForLoadState('domcontentloaded')
    loginPage.login(defaultUser1.email, defaultUser1.password)
    foldersPage = new FoldersPage(page)
    testInfo.setTimeout(30000)
  })

  test('Create and delete a folder', async ({ page }) => {
    const folderName = 'testFolder'
    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    let folderPage = new FolderPage(page)
    await expect(folderPage.folderName).toHaveText(folderName)

    await page.goto(page_data.urls.folders)
    await page.reload()
    await page.waitForLoadState('domcontentloaded')
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
    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    const folderPage = new FolderPage(page)
    await folderPage.uploadFile(filePath)

    await expect(folderPage.files.first()).toHaveText(/4plik/)

    // clean-up
    await page.goto(page_data.urls.folders)
    await foldersPage.deleteFolder(folderName)
  })

  test('Upload multiple files into a folder', async ({ page }) => {
    // TODO: update when file in folder component is compleated

    const folderName = 'fileFolder'
    const paths = [
      '../documents-for-tests/4plik.pdf',
      '../documents-for-tests/000.pdf',
      '../documents-for-tests/33plik33.pdf',
      '../documents-for-tests/AAA.pdf',
      '../documents-for-tests/innyplik.pdf',
    ]

    await foldersPage.createFolder(folderName)
    await page.waitForTimeout(500)

    const folderPage = new FolderPage(page)
    await folderPage.uploadFiles(paths)
    const allTexts = await folderPage.files.all()
    for (let file of allTexts) {
      console.log(await file.innerText())
    }

    await expect(folderPage.files.first()).toHaveText(/4plik/)
    await expect(folderPage.files.last()).toHaveText(/innyplik/)

    // clean-up
    await page.goto(page_data.urls.folders)
    await foldersPage.deleteFolder(folderName)
  })

  //   test.afterAll(async ({ page }) => {
  //     // TODO: add removal of created folders
  //   })
})
