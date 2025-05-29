import { test as base } from '@playwright/test'
export type TestOptions = {
  pageContent: object
}

export const test = base.extend<TestOptions>({})
