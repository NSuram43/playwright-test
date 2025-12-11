import { Locator } from "@playwright/test";

export interface IOrdersLocators {
    creditCard_opt: Locator;
    creditCard_form: Locator;
    creditCardNumber_input: Locator;
    credCardName_input: Locator;
    creditCardExpiryDate: Locator;
    creditCardExpiryYear:Locator;
    creditCardCvv: Locator;
    coupon_input: Locator;
    applyCoupon_btn: Locator;
    shippingInfo_form: Locator;
    shippingInfo_hdrs: Locator;
    selectCountry_inp: Locator;
    email_lbl: Locator;
    placeOrder_btn: Locator;
    itemDetails: Locator;
    countryList: Locator;
}