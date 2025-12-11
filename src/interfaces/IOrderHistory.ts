import { Locator } from "@playwright/test";

export interface IOrderHistory {
    getHeader: Locator;
    getTable: Locator;
    getTableRows: Locator;
    getOrderIdList:Locator;
}