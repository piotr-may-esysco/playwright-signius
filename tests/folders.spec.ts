import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { loginPageDataPL } from '../test_data/login.data'
import { defaultUser1 } from '../test_data/users.data'
import { FoldersPage } from '../pages/folders.page'

test.describe('login page tests PL', () => {
  let foldersPage: FoldersPage

  test.beforeEach(async ({ page }) => {
    await page.goto(page_data.urls.login)
    const loginPage = new LoginPage(page)
    await page.waitForLoadState('domcontentloaded')
    loginPage.login(defaultUser1.email, defaultUser1.password)
    foldersPage = new FoldersPage(page)
  })

  test('Create and delete a folder', async ({ page }) => {
    const folderName = 'testFolder'
    await foldersPage.createFolder(folderName)

    await page.goto(page_data.urls.folders)

    const foldersNames = await foldersPage.getFoldersNames()
    // console.log(foldersNames)

    await expect(foldersNames).toContain(folderName)

    // clean-up
    await foldersPage.deleteFolder(folderName)
    await expect(foldersNames).toContain(folderName)
  })

  test.afterAll(async ({ page }) => {
    // TODO: add removal of folders
  })
})
