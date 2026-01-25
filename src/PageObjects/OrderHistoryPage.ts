import { expect, Page } from "@playwright/test";
import { IOrderHistory } from "@src/interfaces/IOrderHistory";
import { orderHistorySelectors } from "@src/pages/selectors/orderHistory";

export class OrderHistoryPage {
  readonly page: Page;
  public locators: IOrderHistory;
  constructor(page: Page) {
    this.page = page;
    this.locators = {} as IOrderHistory;
    for (const key of Object.keys(orderHistorySelectors) as Array<
      keyof typeof orderHistorySelectors
    >) {
      const selector = orderHistorySelectors[key];
      this.locators[key] = this.page.locator(selector);
    }
  }
  async validateOrderHistoryHeaderText(text: string) {
    expect(await this.locators.getHeader.textContent()).toBe(text);
  }

  async validateOrderIdInOrderHistory(orderId: string, orderIdIndex: number) {
    const orderIds = this.locators.getOrderIdList;
    expect(await orderIds.nth(orderIdIndex).textContent()).toBe(orderId);
  }
  async getOrderIdIndex(orderId: string): Promise<number> {
    const orderIds = this.locators.getOrderIdList;
    const count = await orderIds.count();
    let found = false;

    for (let i = 0; i < count; i++) {
      const currentOrderId = await orderIds.nth(i).textContent();
      if (currentOrderId?.trim() === orderId) {
        found = true;
        return i;
      }
    }
    throw new Error(`Order ID ${orderId} not found in order history.`);
  }
  async getOrderDetails(orderId: string, orderIdIndex: number) {
    const orderIds = this.locators.getOrderIdList;
    const orderDetails = this.locators.getTableRows.locator(".btn-primary");
    expect(await orderIds.nth(orderIdIndex).textContent()).toBe(orderId);
    await orderDetails.nth(orderIdIndex).click();
    await this.page.waitForLoadState("networkidle");
  }
}
