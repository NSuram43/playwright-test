import type { Locator } from '@playwright/test';

export interface ILoginPageLocators {
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    registerLink: Locator;
}