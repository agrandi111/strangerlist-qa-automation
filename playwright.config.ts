import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },

  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://immense-hollows-74271.herokuapp.com/',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'create-item',
      testMatch: /create-item\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'edit-item',
      testMatch: /edit-item\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'delete-existing-item',
      testMatch: /delete-existing-item\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'check-item',
      testMatch: /check-item\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],

});
