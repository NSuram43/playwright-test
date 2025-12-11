import { expect, Page } from "@playwright/test";
import { IOrderDetails } from "@src/interfaces/IOrderDetails";
import { orderDetailsSelectors } from "@src/pages/selectors/OrderDetails";

export class OrderDetailsPage {
    readonly page: Page;
    public locators: IOrderDetails;
    constructor(page: Page) {
        this.page = page;
        this.locators = {} as IOrderDetails;
        for (const key of Object.keys(orderDetailsSelectors) as Array<keyof typeof orderDetailsSelectors>) {
            const selector = orderDetailsSelectors[key];
            this.locators[key] = this.page.locator(selector);
        }
    }
    async validateOrderDetailsPage(){
        this.locators.getThankYou_msg.waitFor({state:'visible'});
        const orderSummary = await this.locators.getOrderSummary_hdr.textContent();
        expect(await this.locators.getThankYou_msg.textContent()).toBe('Thank you for Shopping With Us');
        expect(orderSummary?.trim().toLocaleLowerCase()).toBe('order summary');
    }
    async validateOrderId(expectedOrderId:string){
        const orderId = await this.locators.getOrderId.textContent();
        expect(orderId?.trim()).toBe(expectedOrderId);
    }
    async validateProductTitle(productName:string){
        const productTitle = this.page.locator('.title');
        expect(await productTitle.textContent()).toBe(productName);
    }

}