import { expect, Page } from "@playwright/test";
import { IOrdersLocators } from "@src/interfaces/IOrders";
import { orderSelectors } from "@src/pages/selectors/Order";
import { ProductDetails } from "@src/utils/constants";


export class OrderPage {
    readonly page: Page;
    public locators: IOrdersLocators;
    constructor(page: Page) {
        this.page = page;
        this.locators = {} as IOrdersLocators;
        for (const key of Object.keys(orderSelectors) as Array<keyof typeof orderSelectors>) {
            const selector = orderSelectors[key];
            this.locators[key] = this.page.locator(selector);
        }
    }
    //     async validatePaymentPage(){
    // this.locators.shippingInfo_hdrs
    //     }


    async paymentWithCreditCard(cardNumber: string, cardName: string, ccCvv: string) {
        await this.locators.creditCard_opt.click();
        await this.locators.creditCard_form.waitFor({ state: 'visible' });
        await this.locators.creditCardNumber_input.fill(cardNumber);
        await this.locators.credCardName_input.fill(cardName);
        await this.locators.creditCardCvv.fill(ccCvv);
    }

    async validateShippingInfoForm(email: string) {
        await this.locators.shippingInfo_form.waitFor({ state: 'visible' });
        const isVisible = await this.locators.shippingInfo_hdrs.first().isVisible();
        if (!isVisible) {
            throw new Error('Shipping Info form is not visible');
        }
        const emailLabel = await this.locators.email_lbl.textContent();
        expect(emailLabel?.trim()).toBe(email);
    }

    async validateProductDetails(products: ProductDetails[]) {
        for (const product of products) {
            const productElement = this.locators.itemDetails.filter({ hasText: product.name });

            const productName = await productElement.locator('.item__title').textContent();
            expect(productName?.trim().toLowerCase()).toBe(product.name.toLowerCase());

            const productPrice = await productElement.locator('.item__price').textContent();
            expect(productPrice?.split('$')[1].trim()).toBe(product.price);

            const productQuantity = await productElement.locator('.item__quantity').textContent();
            expect(parseInt(productQuantity?.split(':')[1].trim() || '0')).toBe(product.quantity);
        }
    }
    async selectCountry(countryName: string) {
        await this.locators.selectCountry_inp.pressSequentially(countryName);
        await this.locators.countryList.waitFor({ state: 'visible', timeout: 5000 });
        const optionsCount = await this.locators.countryList.locator('button').count();
        for(let i=0;i<optionsCount;i++){
            let text:any;
            text =  await this.locators.countryList.locator("button").nth(i).textContent();
            if(text.trim() === countryName)
            {
               await this.locators.countryList.locator("button").nth(i).click();
               break;
            }
        }
    }
    async placeOrder() {
        await this.locators.placeOrder_btn.click();
    }
}