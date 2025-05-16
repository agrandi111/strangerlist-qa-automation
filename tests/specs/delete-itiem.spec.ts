import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { randomWords } from "../utils/generateRandomText";


let home: HomePage;

const itemText = randomWords(100);
const itemImage = "aut-stranger2.jpg";


// 1. Create an item
test("Delete an item", async ({ page }) => {
    home = new HomePage(page);
    let initialItemCount = 0;

    await test.step("Navigate to home page", async () => {
        await home.navigate();
    });
    //TODO: Replace UI creation(already covered in create-item.spec.ts) with API creation
    await test.step("Add new item", async () => {
        initialItemCount = await home.getItemCount();
        await home.addItem(itemText, `tests/assets/${itemImage}`);
    });
    await test.step("Check item is created", async () => {
        await home.expectItemTextVisibility(itemText, 'isVisible');
        await home.expectItemImageVisibility(itemImage, 'isVisible');
    });

    await test.step("Delete last created item", async () => {
        await home.deleteItem();
    });
    await test.step("Check item is deleted", async () => {
        await home.expectItemTextVisibility(itemText, 'isNotVisible');
        await home.expectItemImageVisibility(itemImage, 'isNotVisible');
    });
    await test.step("Check item count", async () => {
        await home.expectItemCount(initialItemCount);
    });
});
