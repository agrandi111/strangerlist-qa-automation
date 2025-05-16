import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  // Arrange
  readonly page: Page;
  readonly itemCard: Locator;
  readonly itemDescription: Locator;
  readonly itemImage: Locator;
  readonly itemTextInput: Locator;
  readonly createButton: Locator;
  readonly fileInput: Locator;
  readonly fileInputNative: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemCard = page.getByRole("listitem");
    //page.locator('main ul > li');
    this.itemDescription = page.getByRole("listitem").locator("p");
    //page.locator('main ul > li p');
    this.itemImage = page.getByRole("listitem").locator("img");
    //page.locator('main ul > li img');
    this.itemTextInput = page.getByRole("textbox", {
      name: /maximum allowed length/i,
    });
    this.createButton = page.getByRole("button", { name: /create item/i });
    this.fileInput = page.getByRole("button", { name: /choose file/i });
    this.fileInputNative = page.locator('input[type="file"]');
  }

  // Act

  async navigate() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async fillItemTextInput(text: string) {
    await this.itemTextInput.fill(text);
  }

  async uploadImage(filePath: string) {
    await this.fileInputNative.setInputFiles(filePath);
  }

  async addItem(text: string, filePath: string) {
    await this.uploadImage(filePath);
    await this.fillItemTextInput(text);
    await this.createButton.click();
  }

  async getItemCount(): Promise<number> {
    await this.itemCard.first().waitFor({ state: "visible" });
    return await this.itemCard.count();
  }

  // Assert
  async expectItemCount(count: number) {
    console.log("itemCard", await this.itemCard.count());
    await expect(this.itemCard).toHaveCount(count);
  }

  async expectItemVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectItemImageVisible(filePath: string) {
    await expect(this.itemImage.last()).toHaveAttribute(
      "src",
      new RegExp(filePath),
    );
  }

}
