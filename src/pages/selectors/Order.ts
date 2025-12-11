export const orderSelectors = {
    creditCard_opt: '.payment__type--cc',
    creditCard_form:'.form__cc',
    creditCardNumber_input:'.form__cc .text-validated',
    credCardName_input:'div.field .title:has-text("Name on Card") + input',
    creditCardExpiryDate:'.input.ddl:nth-of-type(1)',
    creditCardExpiryYear:'.input.ddl:nth-of-type(1)',
    creditCardCvv:'xpath=(//*[@class="input txt"])[1]',
    coupon_input:'input[name="coupon"]',
    applyCoupon_btn:'.form__cc button',
    shippingInfo_form:'.payment__shipping',
    shippingInfo_hdrs:'.payment__title',
    selectCountry_inp:'[placeholder="Select Country"]',
    countryList:'section.ta-results',
    email_lbl:'.details__user label',
    placeOrder_btn:'.action__submit:has-text("Place Order")',
    itemDetails:'.item__details'
}
