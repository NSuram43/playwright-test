import { expect, Page } from "@playwright/test";
import { IOrderConfirmation } from "@src/interfaces/IOrderConfirmation";
import { orderConfirmationSelectors } from "@src/pages/selectors/OrderConfirmation";

export class OrderConfirmationPage {
  readonly page: Page;
  public locators: IOrderConfirmation;
  constructor(page: Page) {
    this.page = page;
    this.locators = {} as IOrderConfirmation;
    for (const key of Object.keys(orderConfirmationSelectors) as Array<
      keyof typeof orderConfirmationSelectors
    >) {
      const selector = orderConfirmationSelectors[key];
      this.locators[key] = this.page.locator(selector);
    }
  }

  async validateOrderConfirmationMessage(expectedMessage: string) {
    this.locators.orderSuccess_msg.waitFor({ state: "visible" });
    const message = await this.locators.orderSuccess_msg.textContent();
    if ((message?.trim() || "") !== expectedMessage) {
      throw new Error(
        `Expected message "${expectedMessage}", but got "${message?.trim()}"`
      );
    }
    await expect(message?.trim()).toBe(expectedMessage);
  }
  async getOrderId(): Promise<string | undefined> {
    const orderId_raw = await this.locators.orderId.textContent();
    const orderId = orderId_raw?.trim().split("|")[1].trim();
    return orderId;
  }

  async compareOrderConfirmationVisually() {
    expect(await this.page.screenshot()).toMatchSnapshot(
      "OrderConfirmationPage.png"
    );
  }
}
