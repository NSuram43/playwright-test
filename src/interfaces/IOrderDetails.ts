import { Locator } from "@playwright/test";

export interface IOrderDetails {
    getThankYou_msg: Locator;
    getOrderId: Locator;
    getOrderSummary_hdr: Locator;
}