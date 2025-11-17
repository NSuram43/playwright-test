import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/PageObjects/LoginPage";
import { Dashboard } from "@src/PageObjects/DashboardPage";

test.describe("end-to-end test", () => {
    let loginPage:LoginPage;
    let dashboardPage:Dashboard;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    });
    test.only("login and navigate to dashboard page", async () => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        if (!email || !password) {
            throw new Error('Email or password is not defined in the environment variables.');
        }
        await loginPage.login(email, password);
        await expect(loginPage.page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
        dashboardPage = new Dashboard(loginPage.page);
        await dashboardPage.validateDashboardPage();
        await dashboardPage.addProductToCart('IPHONE 13 PRO');
        const price = await dashboardPage.getProductValue('IPHONE 13 PRO');
        await dashboardPage.navigateToCart();
        expect(loginPage.page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/cart');
        await loginPage.page.pause();
    })
});