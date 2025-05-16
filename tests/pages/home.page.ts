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
  readonly editButton: Locator;
  readonly updateItemButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.itemCard = page.getByRole("listitem");
    this.itemDescription = page.getByRole("listitem").locator("p");
    this.itemImage = page.getByRole("listitem").locator("img");
    this.itemTextInput = page.getByRole("textbox", {
      name: /maximum allowed length/i,
    });
    this.createButton = page.getByRole("button", { name: /create item/i });
    this.editButton = page.getByRole("button", { name: /edit/i });
    this.updateItemButton = page.getByRole("button", { name: /update item/i });
    this.deleteButton = page.getByRole("button", { name: /delete/i });
    this.confirmDeleteButton = page.getByRole("button", {
      name: /yes, delete it!/i,
    });
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

  async editItem(index: number, text: string, filePath?: string) {
    await this.editButton.nth(index).click();
    await this.updateItemButton.waitFor({ state: "visible" });
    if (filePath) {
      await this.uploadImage(filePath);
    }
    await this.itemTextInput.waitFor({ state: "visible" });
    await this.fillItemTextInput(text);
    await this.updateItemButton.click();
  }

  async getCurrentItemText(index: number): Promise<string> {
    await this.itemDescription.nth(index).waitFor({ state: "visible" });
    const currentText = await this.itemDescription.nth(index).textContent() ||
      "";
    return currentText;
  }

  async getItemCount(): Promise<number> {
    await this.itemCard.first().waitFor({ state: "visible" });
    return await this.itemCard.count();
  }

  async deleteItem(index?: number) {
    let itemToDelete = index !== undefined
      ? this.deleteButton.nth(index)
      : this.deleteButton.last();
    await itemToDelete.click();
    await this.confirmDeleteButton.click();
  }

  // Assert
  async expectItemCount(count: number) {
    await expect(this.itemCard).toHaveCount(count);
  }

  async expectItemTextVisibility(
    text: string | RegExp,
    condition: "isVisible" | "isNotVisible",
  ): Promise<void> {
    const isVisible = condition === "isVisible";
    await (isVisible
      ? expect.soft(this.page.getByText(text)).toBeVisible()
      : expect.soft(this.page.getByText(text)).not.toBeVisible());
  }

  async expectItemImageVisibility(
    filePath: string,
    condition: "isVisible" | "isNotVisible",
    index?: number
  ) {
    let image = index !== undefined
      ? this.itemImage.nth(index)
      : this.itemImage.last();
    const isVisible = condition === "isVisible";
    await (isVisible
      ? expect(image).toHaveAttribute("src", new RegExp(filePath))
      : expect(image).not.toHaveAttribute("src", new RegExp(filePath)));
  }

  async expectCreateItemeButtonIsEnabled() {
    await expect(this.createButton).toBeEnabled({ timeout: 5_000 });
  }

  async expectCreateItemeButtonIsDisabled() {
    await expect(this.createButton).toBeDisabled({ timeout: 5_000 });
  }

  async expectItemTextInputHasMaxLength(length: number) {
    await expect(this.itemTextInput).toHaveAttribute(
      "ng-maxlength",
      length.toString(),
    );
  }
}
