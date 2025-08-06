import { expect } from "playwright/test";

// Page object for the Home Page
export class HomePage {
    readonly signupLoginButton;
    readonly loggedInAsText;
    readonly deleteAccountButton;
    readonly accountDeletedText;

    constructor(private page: any) {
        this.signupLoginButton = this.page.locator('text=Signup / Login');
        this.loggedInAsText = (userName: string) => this.page.locator(`text=Logged in as ${userName}`);
        this.deleteAccountButton = this.page.locator('text=Delete Account');
        this.accountDeletedText = this.page.locator('text=Account Deleted!');
    }

    async navigateToHomePage() {
        await this.page.goto('http://automationexercise.com');
    }

    async verifyHomePageVisible() {
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    async verifyUserLoggedIn(userName: string) {
        await expect(this.loggedInAsText(userName)).toBeVisible();
    }

    async deleteAccount() {
        await this.deleteAccountButton.click();
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedText).toBeVisible();
    }
}
