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
2. Run all tests (default):
   ```bash
   docker run --rm strangerlist-tests
   ```
3. Run a specific project (e.g., mobile):
   ```bash
   docker run --rm strangerlist-tests npx playwright test --project=mobile
   ```
4. Run a specific test file:
   ```bash
   docker run --rm strangerlist-tests npx playwright test tests/specs/create-itiem.spec.ts
   ```

## Notes
- Test results and reports are generated in the container. To access them, use Docker volumes to mount a local directory.
- Update the Playwright version in the Dockerfile if you upgrade Playwright in your project. 