import { Page } from "@playwright/test";
import { ILoginPageLocators } from "../interfaces/ILoginPage";
import { loginSelectors } from "../pages/selectors/Login";


export class LoginPage{
    readonly page:Page;
    public locators: ILoginPageLocators;
    constructor(page:Page){
        this.page=page;
        this.locators = {} as ILoginPageLocators;
        for(const key of Object.keys(loginSelectors) as Array<keyof typeof loginSelectors>){
            const selector = loginSelectors[key];
            this.locators[key] = this.page.locator(selector);
        }
    }

    async login(username:string, password:string){
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(password);
        await this.locators.loginButton.click();
    }
    async navigateToRegisterPage(){
        await this.locators.registerLink.click();
    }
}