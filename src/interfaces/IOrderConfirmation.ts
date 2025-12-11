import { Locator } from "@playwright/test";

export interface IOrderConfirmation {
    orderSuccess_msg: Locator;
    orderNumber_lbl: Locator;
    downloadInvoice_btn: Locator;
    continueShopping_btn: Locator;
    orderId: Locator;
}