import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { randomWords } from "../utils/generateRandomText";

let home: HomePage;

const itemImage = "aut-stranger2.jpg";
const creatorsText = "Creators: Matt Duffer, Ross Duffer";

test.describe("Check item", () => {
  let itemText = "";
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await test.step("Navigate to home page", async () => {
      await home.navigate();
    });
  });

  // 4. Check max long in description
  test("Check max length in description", async () => {
    await test.step("Check max length in description", async () => {
      await home.expectItemTextInputHasMaxLength(300);
    });
    await test.step("Add long description with less than 300 characters", async () => {
      const longDesc = randomWords(299);
      await home.uploadImage(`tests/assets/${itemImage}`);
      await home.fillItemTextInput(longDesc);
    });
    await test.step("Check if create button is enabled", async () => {
      await home.expectCreateItemeButtonIsEnabled();
    });
    await test.step("Add long description with more than 300 characters", async () => {
      const longDesc = randomWords(301);
      await home.uploadImage(`tests/assets/${itemImage}`);
      await home.fillItemTextInput(longDesc);
    });
    await test.step("Check if create button is disabled", async () => {
      await home.expectCreateItemeButtonIsDisabled();
    });
  });

  // 5. Check if exist in the list the item with text "Creators: Matt Duffer, Ross Duffer"
  test("Check for creators item in list", async () => {
    await test.step("Check creators text", async () => {
      await home.expectItemTextVisibility(creatorsText, 'isVisible');
    });
  });
});
