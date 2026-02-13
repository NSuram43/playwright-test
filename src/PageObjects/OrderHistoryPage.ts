import { expect, Locator, Page } from "@playwright/test";
import { IOrderHistory } from "@src/interfaces/IOrderHistory";
import { orderHistorySelectors } from "@src/pages/selectors/orderHistory";

export class OrderHistoryPage {
  readonly page: Page;
  readonly getHeader: Locator;
  readonly getTable: Locator;
  readonly getTableRows: Locator;
  readonly getOrderIdList: Locator;
  constructor(page: Page) {
    this.page = page;
    this.getHeader = page.locator(orderHistorySelectors.getHeader);
    this.getTable = page.locator(orderHistorySelectors.getTable);
    this.getTableRows = page.locator(orderHistorySelectors.getTableRows);
    this.getOrderIdList = page.locator(orderHistorySelectors.getOrderIdList);
  }
  async validateOrderHistoryHeaderText(text: string) {
    expect(await this.getHeader.textContent()).toBe(text);
  }

  async validateOrderIdInOrderHistory(orderId: string, orderIdIndex: number) {
    const orderIds = this.getOrderIdList;
    expect(await orderIds.nth(orderIdIndex).textContent()).toBe(orderId);
  }
  async getOrderIdIndex(orderId: string): Promise<number> {
    const orderIds = this.getOrderIdList;
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
    const orderIds = this.getOrderIdList;
    const orderDetails = this.getTableRows.locator(".btn-primary");
    expect(await orderIds.nth(orderIdIndex).textContent()).toBe(orderId);
    await orderDetails.nth(orderIdIndex).click();
    await this.page.waitForLoadState("networkidle");
  }
}
