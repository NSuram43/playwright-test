import { expect, Page } from "@playwright/test";
import { IDashboardPageLocators } from "../interfaces/IDashboardPage";
import { dashboardSelectors } from "../pages/selectors/dashboard";

export class Dashboard{
    readonly page:Page;
    public locators: IDashboardPageLocators;
    constructor(page:Page){
        this.page=page;
        this.locators = {} as IDashboardPageLocators;
        for(const key of Object.keys(dashboardSelectors) as Array<keyof typeof dashboardSelectors>){
            const selector = dashboardSelectors[key];
            this.locators[key] = this.page.locator(selector);
        }
    }
    async validateDashboardPage(){
        await expect(this.locators.getAutomation_hdr).toHaveText('Automation');
        await expect(this.locators.getSubHeader_txt).toHaveText('Automation Practice');
        await expect(this.locators.getHomeBtn).toBeVisible();
        await expect(this.locators.getOrdersBtn).toBeVisible();
        await expect(this.locators.getCartBtn).toBeVisible();


        await expect(this.locators.getBlinkingLabel).toHaveText('User can only see maximum 9 products on a page');
    }
    async addProductToCart(productName:string){
        const productTitle = productName.toLowerCase();
        const productCards = this.locators.getProductCard;
        const count = await productCards.count();
        for(let i=0; i<count; i++){
            const title = await productCards.nth(i).locator(this.locators.getProduct_title).textContent();
            const normalizedTitle = title?.trim().toLowerCase() || '';
            if(normalizedTitle.includes(productTitle)){
                await productCards.nth(i).locator('button:text("Add to Cart")').click();
                await this.locators.getCardCount.waitFor({state:'visible'});
                const cartCountText = await this.locators.getCardCount.textContent();
                    const cartCount = parseInt(cartCountText || '0');
                    expect(cartCount).toBeGreaterThan(0);
                break;
            }
        }
    }
    async getProductValue(productName:string){
        const productCards = this.locators.getProductCard;
        const count = await productCards.count();
        for(let i=0; i<count; i++){
            const title = await productCards.nth(i).locator(this.locators.getProduct_title).textContent();
            if(title?.trim().toLowerCase().includes(productName.toLowerCase())){
                const priceText = await productCards.nth(i).locator('.text-muted').textContent();
                return priceText?.split('$')[1].trim();
            }
        }
        return null;
    }
    async navigateToCart(){
        await this.locators.getCartBtn.click();
    }
    async navigateToOrders(){
        await this.locators.getOrdersBtn.click();
    }
}