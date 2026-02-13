import { expect, Locator, Page } from "@playwright/test";
import { IOrderConfirmation } from "@src/interfaces/IOrderConfirmation";
import { orderConfirmationSelectors } from "@src/pages/selectors/OrderConfirmation";

export class OrderConfirmationPage {
  readonly page: Page;
  readonly orderSuccess_msg: Locator;
  readonly orderNumber_lbl: Locator;
  readonly downloadInvoice_btn: Locator;
  readonly continueShopping_btn: Locator;
  readonly orderId: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderSuccess_msg = page.locator("h1.hero-primary");
    this.orderNumber_lbl = page.locator(".order__success--order-number");
    this.downloadInvoice_btn = page.locator(".action__download-invoice");
    this.continueShopping_btn = page.locator(".action__continue-shopping");
    this.orderId = page.locator(
      'tr[class="ng-star-inserted"] [class="em-spacer-1"]'
    );
  }

  async validateOrderConfirmationMessage(expectedMessage: string) {
    this.orderSuccess_msg.waitFor({ state: "visible" });
    const message = await this.orderSuccess_msg.textContent();
    if ((message?.trim() || "") !== expectedMessage) {
      throw new Error(
        `Expected message "${expectedMessage}", but got "${message?.trim()}"`
      );
    }
    await expect(message?.trim()).toBe(expectedMessage);
  }
  async getOrderId(): Promise<string | undefined> {
    const orderId_raw = await this.orderId.textContent();
    const orderId = orderId_raw?.trim().split("|")[1].trim();
    return orderId;
  }

  async compareOrderConfirmationVisually() {
    expect(await this.page.screenshot()).toMatchSnapshot(
      "OrderConfirmationPage.png"
    );
  }
}
