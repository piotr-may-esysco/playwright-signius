import { test, expect } from '@playwright/test'
import { page_data } from '../test_data/page.data'
import { LoginPage } from '../pages/login.page'
import { defaultUser1, defaultUser2, fakeUser } from '../test_data/users.data'
import { RegistrationPage } from '../pages/registstration.page'
import { SMSVerification } from '../components/sms-verification.component'

test.describe('Registration Capcha', () => {
  // let registrationPage: RegistrationPage

  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(4 * 60 * 1000)
  })

  test.only('Capcha test', async ({ page }) => {
    const iterations = 200
    let phoneNumber = 500000000
    for (let i = 0; i < iterations; i++) {
      console.log('Iteracja: ' + i.toString())

      // Go to registration page
      await page.goto(page_data.urls.login)
      const loginPage = new LoginPage(page)
      await loginPage.registerButton.click()
      await page.waitForLoadState('domcontentloaded')
      const registrationPage = new RegistrationPage(page)

      // fill first form
      await registrationPage.fillRegisterForm(
        fakeUser.email,
        phoneNumber.toString(),
        fakeUser.country,
        fakeUser.firstName,
        fakeUser.lastName,
        fakeUser.password
      )
      await expect(registrationPage.registerButton).toBeEnabled()
      await registrationPage.registerButton.click()
      await page.waitForLoadState('domcontentloaded')
      const smsVerification = new SMSVerification(page)

      // check if passed
      await expect(smsVerification.smsSendedHeader).toHaveText(
        'Wysłaliśmy do Ciebie SMS z kodem'
      )

      await smsVerification.codeInput.fill('111111')

      await expect(page.locator('h1.confirmation-title')).toHaveText(
        'Wysłaliśmy do Ciebie email'
      )
      phoneNumber++
    }
  })
})
