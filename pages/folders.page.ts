import { Locator, Page } from '@playwright/test'

export class FoldersPage {
  newFolderButton: Locator
  foldes: Locator // TODO: check how multiple folders behave

  constructor(private page: Page) {}
}
