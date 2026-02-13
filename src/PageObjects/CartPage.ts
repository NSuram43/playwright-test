import { expect, Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly getCartItems: Locator;
  readonly getCheckoutButton: Locator;
  readonly getContinueShoppingButton: Locator;
  readonly getMyCart_hdr: Locator;
  readonly cartSubTotalPrice: Locator;
  readonly cartTotalPrice: Locator;
  constructor(page: Page) {
    this.page = page;
    this.getCartItems = page.locator(".items");
    this.getCheckoutButton = page.locator(".subtotal button");
    this.getContinueShoppingButton = page.locator(
      'button[routerlink="/dashboard"]'
    );
    this.getMyCart_hdr = page.locator(".heading h1");
    this.cartSubTotalPrice = page.locator(
      'xpath=(//li[@class="totalRow"] /span[@class="value"])[1]'
    );
    this.cartTotalPrice = page.locator(
      'xpath=(//li[@class="totalRow"] /span[@class="value"])[2]'
    );
  }
  async getCartItemsCount(): Promise<number> {
    return await this.getCartItems.count();
  }
  async getCartTotalPrice(): Promise<string> {
    return (await this.cartTotalPrice.textContent()) || "";
  }
  async proceedToCheckout() {
    await this.getCheckoutButton.click();
  }
  async validateCartItems(expectedItems: string[]) {
    const cartItems = this.getCartItems;
    const count = await cartItems.count();
    const actualItems: string[] = [];
    for (let i = 0; i < count; i++) {
      const itemName = await cartItems.nth(i).locator("h3").textContent();
      if (itemName) {
        actualItems.push(itemName.trim().toLowerCase());
      }
    }
    expectedItems.forEach((item) => {
      if (!actualItems.includes(item.toLowerCase())) {
        throw new Error(`Expected item ${item} not found in cart`);
      }
    });
  }
  async continueShopping() {
    await this.getContinueShoppingButton.click();
    await expect(this.page.url()).toContain("/dashboard/dash");
  }
}
