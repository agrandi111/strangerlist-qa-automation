import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

let home: HomePage;

const itemImage = "aut-stranger2.jpg";

// 2. Edit an existing item
test.describe("Edit an existing item", () => {
    let itemText = "";
    test.beforeEach(async ({ page }) => {
        home = new HomePage(page);
        await test.step("Navigate to home page", async () => {
            await home.navigate();
        });
    });

    test("Update only the text", async () => {
        await test.step("Edit first item", async () => {
            let originalText = await home.getCurrentItemText(0)
            itemText = `[Edited first] ${originalText}`;
            await home.editItem(0, itemText);
        });
        await test.step("Check item is updated", async () => {
            await home.expectItemTextVisibility(itemText, 'isVisible');
        });
    });

    test("Update text and image", async () => {
        await test.step("Edit second item", async () => {
            let originalText = await home.getCurrentItemText(1)
            itemText = `[Edited second] ${originalText}`;
            await home.editItem(1, itemText, `tests/assets/${itemImage}`);
        });
        await test.step("Check item is updated", async () => {
            await home.expectItemTextVisibility(itemText, 'isVisible');
            await home.expectItemImageVisibility(itemImage, 'isVisible', 0);
        });
    });

    //TODO: restore original text
});
