import { Locator, Page } from '@playwright/test'

export class NavbarComponant {
  logo: Locator
  dataBox: Locator
  profileButton: Locator
  helpButton: Locator
  SignOut: Locator

  constructor(private page: Page) {}
}
