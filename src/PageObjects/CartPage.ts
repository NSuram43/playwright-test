import { expect, Page } from "@playwright/test";
import { ICartLocators } from "@src/interfaces/ICart";
import { cartSelectors } from "@src/pages/selectors/Cart";

export class CartPage{
    readonly page:Page;
    public locators:ICartLocators;
    constructor(page:Page){
        this.page=page;
        this.locators = {} as ICartLocators;
        for(const key of Object.keys(cartSelectors) as Array<keyof typeof cartSelectors>){
            const selector = cartSelectors[key];
            this.locators[key] = this.page.locator(selector);
        }
    }
    async getCartItemsCount():Promise<number>{
        return await this.locators.getCartItems.count();
    }
    async getCartTotalPrice():Promise<string>{
        return await this.locators.cartTotalPrice.textContent() || '';
    }
    async proceedToCheckout(){
        await this.locators.getCheckoutButton.click();
    }
    async validateCartItems(expectedItems:string[]){
        const cartItems = this.locators.getCartItems;
        const count = await cartItems.count();
        const actualItems:string[] = [];
        for(let i=0; i<count; i++){
            const itemName = await cartItems.nth(i).locator('h3').textContent();
            if(itemName){
                actualItems.push(itemName.trim().toLowerCase());
            }
        }
        expectedItems.forEach(item=>{
            if(!actualItems.includes(item.toLowerCase())){
                throw new Error(`Expected item ${item} not found in cart`);
            }
        });
    }
    async continueShopping(){
        await this.locators.getContinueShoppingButton.click();
        await expect(this.page.url()).toContain('/dashboard/dash');
    }
}
    