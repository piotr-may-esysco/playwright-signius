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
  let language
  test.beforeEach(async ({ page }, testInfo) => {
    language = testInfo.project.use.locale?.slice(0, 2)
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
      textContent.AUTH.ALREADY_HAVE_ACCOUNT + ' ' + textContent.AUTH.LOGIN
    )
    await expect(page.locator('.sig-checkbox-label div')).toHaveText(
      textContent.AUTH.ACCEPT_TERMS.replace(/<[^>]+>/g, '')
    )
    await expect(registrationPage.cookiesText).toHaveText(
      textContent.AUTH.ACCEPT_TERMS_2.replace(/<[^>]+>/g, '')
    )
    await expect(registrationPage.registerButton).toHaveText(
      textContent.AUTH.CREATE_ACCOUNT //+ ' ' + textContent.AUTH.LOGIN
    )
  })

  test('test focuses', async ({ page }) => {
    await registrationPage.fillRegisterForm(
      fakeUser.email,
      fakeUser.phoneNumber,
      fakeUser.country,
      fakeUser.firstName,
      fakeUser.lastName,
      fakeUser.password
    )
    await page.locator('.logo--signius').click()
    await page.locator('.logo--signius').press('Tab')
    await registrationPage.validateFocusOnButton(
      registrationPage.accessibilityButton
    )
    await registrationPage.loginLink.press('Tab')
    await registrationPage.validateFocusOnButton(registrationPage.loginLink)
    await registrationPage.loginLink.press('Tab')
    await registrationPage.validateFocusOnInput(registrationPage.emailInput)
    await registrationPage.emailInput.press('Tab')
    await registrationPage.validateFocusOnButton(
      registrationPage.countrySelector
    )
    await registrationPage.countrySelector.press('Tab')
    await registrationPage.validateFocusOnInput(registrationPage.phoneInput)
    await registrationPage.phoneInput.press('Tab')
    await registrationPage.validateFocusOnInput(registrationPage.firstNameInput)
    await registrationPage.firstNameInput.press('Tab')
    await registrationPage.validateFocusOnInput(registrationPage.lastNameInput)
    await registrationPage.lastNameInput.press('Tab')
    await registrationPage.validateFocusOnInput(registrationPage.passwordInput)
    await registrationPage.passwordInput.press('Tab')
    await registrationPage.validateFocusOnButton(
      registrationPage.showPasswordButton.locator('i')
    )
    await registrationPage.showPasswordButton.press('Tab')
    await registrationPage.validateFocusOnButton(
      page.locator('sig-checkbox div').first()
    )
    await registrationPage.showPasswordButton.press('Tab')
    await registrationPage.validateFocusOnButton(registrationPage.terms1Link)
    await registrationPage.terms1Link.press('Tab')
    await registrationPage.validateFocusOnButton(registrationPage.terms2Link)
    await registrationPage.terms2Link.press('Tab')
    await registrationPage.validateFocusOnButton(
      registrationPage.registerButton
    )
    // await registrationPage.showPasswordButton.press('Tab')
  })

  test('Link tests', async ({ page }) => {
    let correctUrls = [
      page_data.urls.basic + page_data.urls.login,
      page_data.urls.externalLinks.regulations.replace('pl', language),
      page_data.urls.externalLinks.privacyPolicy.replace('pl', language),
    ]
    await registrationPage.loginLink.click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(correctUrls[0])

    await page.goto(page_data.urls.registation)
    await registrationPage.terms1Link.click()
    let pagePromise = page.waitForEvent('popup')
    let newTab = await pagePromise
    await newTab.waitForLoadState()
    await expect(newTab).toHaveURL(correctUrls[1])

    await page.goto(page_data.urls.registation)
    await registrationPage.terms2Link.click()
    pagePromise = page.waitForEvent('popup')
    newTab = await pagePromise
    await page.waitForLoadState('domcontentloaded')
    await expect(newTab).toHaveURL(correctUrls[2])
  })
})
