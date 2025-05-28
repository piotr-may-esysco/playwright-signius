import { Locator, Page } from '@playwright/test'

export class NavbarComponent {
  logo: Locator
  userEmail: Locator
  userName: Locator
  profileButton: Locator
  helpButton: Locator
  signOutButton: Locator

  constructor(private page: Page) {
    this.logo = page.locator('.header--button-logo')
    this.userEmail = page.locator('div[name="user-toolbar--label-user-email"]')
    this.userName = page.locator(
      'div[name="user-toolbar--label-user-full-name"]'
    )
    this.profileButton = page.locator(
      'button[name="user-toolbar--button-profile"]'
    )
    this.helpButton = page.locator('button[name="user-toolbar--button-help"]')
    this.signOutButton = page.locator(
      'button[name="user-toolbar--button-logout"]'
    )
  }
}
