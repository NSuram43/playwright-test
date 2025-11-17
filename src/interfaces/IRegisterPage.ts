import type { Locator } from '@playwright/test';

export interface IRegisterPageLocators {
    firstNameInput: Locator;
    lastNameInput: Locator;
    registerButton: Locator;
    userEmailInput: Locator;
    userMobileInput: Locator;
    occupationSelect: Locator;
    gender: Locator;
    passwordRegisterInput: Locator;
    confirmPasswordInput: Locator;
    registerSubmitButton: Locator;
    olderCheckbox: Locator;
}
