import { expect, Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { IDashboardPageLocators } from "../interfaces/IDashboardPage";
import { dashboardSelectors } from "../pages/selectors/dashboard";

export class Dashboard {
  readonly page: Page;
  readonly getAutomation_hdr: Locator;
  readonly getSubHeader_txt: Locator;
  readonly getHomeBtn: Locator;
  readonly getOrdersBtn: Locator;
  readonly getCartBtn: Locator;
  readonly getCardCount: Locator;
  readonly getProductCard: Locator;
  readonly getProduct_title: Locator;
  readonly getBlinkingLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getAutomation_hdr = page.locator(dashboardSelectors.getAutomation_hdr);
    this.getSubHeader_txt = page.locator(dashboardSelectors.getSubHeader_txt);
    this.getHomeBtn = page.locator(dashboardSelectors.getHomeBtn);
    this.getOrdersBtn = page.locator(dashboardSelectors.getOrdersBtn);
    this.getCartBtn = page.locator(dashboardSelectors.getCartBtn);
    this.getCardCount = page.locator(dashboardSelectors.getCardCount);
    this.getProductCard = page.locator(dashboardSelectors.getProductCard);
    this.getProduct_title = page.locator(dashboardSelectors.getProduct_title);
    this.getBlinkingLabel = page.locator(dashboardSelectors.getBlinkingLabel);
  }
  async validateDashboardPage() {
    await expect(this.getAutomation_hdr).toHaveText("Automation");
    await expect(this.getSubHeader_txt).toHaveText("Automation Practice");
    await expect(this.getHomeBtn).toBeVisible();
    await expect(this.getOrdersBtn).toBeVisible();
    await expect(this.getCartBtn).toBeVisible();

    await expect(this.getBlinkingLabel).toHaveText(
      "User can only see maximum 9 products on a page"
    );
  }
  async addProductToCart(productName: string) {
    const productTitle = productName.toLowerCase();
    const productCards = this.getProductCard;
    const count = await productCards.count();
    for (let i = 0; i < count; i++) {
      const title = await productCards
        .nth(i)
        .locator(this.getProduct_title)
        .textContent();
      const normalizedTitle = title?.trim().toLowerCase() || "";
      if (normalizedTitle.includes(productTitle)) {
        await productCards.nth(i).locator('button:text("Add to Cart")').click();
        await this.getCardCount.waitFor({ state: "visible" });
        const cartCountText = await this.getCardCount.textContent();
        const cartCount = parseInt(cartCountText || "0");
        expect(cartCount).toBeGreaterThan(0);
        break;
      }
    }
  }
  async getProductValue(productName: string) {
    const productCards = this.getProductCard;
    const count = await productCards.count();
    for (let i = 0; i < count; i++) {
      const title = await productCards
        .nth(i)
        .locator(this.getProduct_title)
        .textContent();
      if (title?.trim().toLowerCase().includes(productName.toLowerCase())) {
        const priceText = await productCards
          .nth(i)
          .locator(".text-muted")
          .textContent();
        return priceText?.split("$")[1].trim();
      }
    }
    return null;
  }
  async navigateToCart() {
    await this.getCartBtn.click();
  }
  async navigateToOrders() {
    await this.getOrdersBtn.click();
  }
}
