import { Page } from "@playwright/test";
import { IRegisterPageLocators } from "../interfaces/IRegisterPage";
import { registerSelectors } from "../pages/selectors/Register";


export class RegisterPage{
    readonly page:Page;
    public locators: IRegisterPageLocators;
    constructor(page:Page){
        this.page=page;
        this.locators = {} as IRegisterPageLocators;
        for(const key of Object.keys(registerSelectors) as Array<keyof typeof registerSelectors>){
            const selector = registerSelectors[key];
            this.locators[key] = this.page.locator(selector);
        }
    }

    async registerUser(firstName:string, lastName:string, email:string, mobile:string, occupation:string, genderValue:string, password:string, confirmPassword:string){
        this.locators.firstNameInput.fill(firstName);
        this.locators.lastNameInput.fill(lastName);
        this.locators.userEmailInput.fill(email);
        this.locators.userMobileInput.fill(mobile);
        await this.locators.occupationSelect.selectOption(occupation);
        
    }
}