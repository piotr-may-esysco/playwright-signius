import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { defaultUser1, defaultUser2, fakeUser } from '../test_data/users.data'
import { RegistrationPage } from '../pages/registstration.page'
import { getTextContent } from '../test_data/page-content.data'

test.describe('Registration Tests', () => {
  // let registrationPage: RegistrationPage
  let registrationPage: RegistrationPage
  let textContent

  test.beforeEach(async ({ page }, testInfo) => {
    const language = testInfo.project.use.locale?.slice(0, 2)
    textContent = getTextContent(language ?? 'pl')

    await page.goto(page_data.urls.login)
    const loginPage = new LoginPage(page)
    await loginPage.registerButton.click()
    await page.waitForLoadState('domcontentloaded')
    registrationPage = new RegistrationPage(page)
  })

  test('Text content test', async ({ page }) => {
    await expect(registrationPage.emailLabel).toHaveText(textContent.AUTH.EMAIL)
    await expect(registrationPage.passwordLabel).toHaveText(
      textContent.AUTH.CREATE_NEW_PASSWORD
    )
    await expect(registrationPage.firstNameLabel).toHaveText(
      textContent.AUTH.GIVEN_NAMES
    )
    await expect(registrationPage.lastNameLabel).toHaveText(
      textContent.AUTH.LAST_NAME
    )
    await expect(registrationPage.phoneLabel).toHaveText(
      textContent.AUTH.PHONE_NUMBER
    )
    // await expect(registrationPage.registerHeader).toHaveText(
    //   textContent.AUTH.NEW_ACCOUNT
    // )
    await expect(registrationPage.registerText).toHaveText(
      textContent.AUTH.ALREADY_HAVE_ACCOUNT
    )
    await expect(registrationPage.termsCheckbox).toHaveText(
      textContent.AUTH.ACCEPT_TERMS
    )
    await expect(registrationPage.cookiesText).toHaveText(
      textContent.AUTH.ACCEPT_TERMS2
    )
    await expect(registrationPage.registerButton).toHaveText(
      textContent.AUTH.CREATE_ACCOUNT
    )
  })
})
