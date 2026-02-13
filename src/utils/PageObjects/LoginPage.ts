import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { loginSelectors } from "@src/pages/selectors/Login";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(loginSelectors.usernameInput);
    this.passwordInput = page.locator(loginSelectors.passwordInput);
    this.loginButton = page.locator(loginSelectors.loginButton);
    this.registerLink = page.locator(loginSelectors.registerLink);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async navigateToRegisterPage() {
    await this.registerLink.click();
  }
}
