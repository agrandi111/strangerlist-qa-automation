# Strangerlist QA Automation

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Basic Configuration
- All Playwright config is in `playwright.config.ts`.
- Test specs are in `tests/specs/`.
- Each project in Playwright config targets a specific test or device (desktop/mobile).

## Playwright Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Install browsers for Playwright:
   ```bash
   npx playwright install
   ```

## Running Tests

### By Project(by default in desktop browser)
- **Create Item:**
  ```bash
  npm run test:create-item
  ```
- **Edit Item:**
  ```bash
  npm run test:edit-item
  ```
- **Delete Existing Item:**
  ```bash
  npm run test:delete-existing-item
  ```
- **Check Item:**
  ```bash
  npm run test:check-item
  ```

### All Desktop Projects
Runs all desktop-related projects in sequence:
```bash
npm run test:desktop
```

### Mobile Project
Runs all tests using a mobile emulation (Pixel 5):
```bash
npm run test:mobile
```

## Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t strangerlist-tests .
   ```
2. Run all tests (default, all projects):
   ```bash
   docker run --rm strangerlist-tests
   ```
3. Run desktop projects individually(create-item, edit-item, delete-existing-item, check-item):
   ```bash
   docker run --rm strangerlist-tests npx playwright test --project=create-item 
   ```
      ```bash
   docker run --rm strangerlist-tests npx playwright test --project=edit-item 
   ```
      ```bash
   docker run --rm strangerlist-tests npx playwright test --project=delete-existing-item
   ```
      ```bash
   docker run --rm strangerlist-tests npx playwright test --project=check-item
   ```
4. Run all mobile tests:
   ```bash
   docker run --rm strangerlist-tests npx playwright test --project=mobile
   ```
5. Run a specific test file:
   ```bash
   docker run --rm strangerlist-tests npx playwright test tests/specs/create-itiem.spec.ts
   ```

## Running Tests in GitHub Actions (workflow_dispatch)

If your repository is set up with a GitHub Actions workflow that supports `workflow_dispatch`, you can manually trigger your Playwright tests from the GitHub UI:

1. Go to the **Actions** tab in your GitHub repository.
2. Select the workflow you want to run (e.g., `Playwright Tests`).
3. Click the **Run workflow** button.
4. Select a Project from dropdown menu
5. Click **Run workflow** to start the job.

This will execute your tests in the GitHub Actions environment

## Notes
- Test results and reports are generated in the container. To access them, use Docker volumes to mount a local directory.
- Update the Playwright version in the Dockerfile if you upgrade Playwright in your project. 