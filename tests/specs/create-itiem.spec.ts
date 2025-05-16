import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { randomWords } from "../utils/generateRandomText";


let home: HomePage;

const itemText = randomWords(100);
const itemImage = "aut-stranger1.jpg";


// 1. Create an item
test("Create an item", async ({ page }) => {
    home = new HomePage(page);
    let initialItemCount = 0;

    await test.step("Navigate to home page", async () => {
        await home.navigate();
    });
    await test.step("Add new item", async () => {
        initialItemCount = await home.getItemCount();
        await home.addItem(itemText, `tests/assets/${itemImage}`);
    });
    await test.step("Check item is created", async () => {
        await home.expectItemVisible(itemText);
        await home.expectItemImageVisible(itemImage);
    });
    await test.step("Check item count", async () => {
        await home.expectItemCount(initialItemCount + 1);
    });

    //TODO: Clean up the item after the test
});
