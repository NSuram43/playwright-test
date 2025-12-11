import { Locator } from "@playwright/test";

export interface ICartLocators {
    getCartItems:Locator;
    getCheckoutButton:Locator;
    getContinueShoppingButton:Locator;
    getMyCart_hdr:Locator;
    cartTotalPrice:Locator;
    cartSubTotalPrice:Locator;
}