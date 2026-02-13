import { expect, Locator, Page } from "@playwright/test";
import { IOrderDetails } from "@src/interfaces/IOrderDetails";
import { orderDetailsSelectors } from "@src/pages/selectors/OrderDetails";

export class OrderDetailsPage {
  readonly page: Page;
  readonly getThankYou_msg: Locator;
  readonly getOrderId: Locator;
  readonly getOrderSummary_hdr: Locator;
  constructor(page: Page) {
    this.page = page;
    this.getThankYou_msg = page.locator(orderDetailsSelectors.getThankYou_msg);
    this.getOrderId = page.locator(orderDetailsSelectors.getOrderId);
    this.getOrderSummary_hdr = page.locator(
      orderDetailsSelectors.getOrderSummary_hdr
    );
  }
  async validateOrderDetailsPage() {
    this.getThankYou_msg.waitFor({ state: "visible" });
    const orderSummary = await this.getOrderSummary_hdr.textContent();
    expect(await this.getThankYou_msg.textContent()).toBe(
      "Thank you for Shopping With Us"
    );
    expect(orderSummary?.trim().toLocaleLowerCase()).toBe("order summary");
  }
  async validateOrderId(expectedOrderId: string) {
    const orderId = await this.getOrderId.textContent();
    expect(orderId?.trim()).toBe(expectedOrderId);
  }
  async validateProductTitle(productName: string) {
    const productTitle = this.page.locator(".title");
    expect(await productTitle.textContent()).toBe(productName);
  }
}
