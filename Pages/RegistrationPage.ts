import { expect, Page } from "playwright/test";
import { RegistrationAdditionalDetails } from '../Interfaces/RegistrationAdditionalDetails';

// Page object for the Registration Page
export class RegistrationPage {
    readonly newUserSignupText;
    readonly signupNameInput;
    readonly signupEmailInput;
    readonly signupButton;
    readonly passwordInput;
    readonly daysDropdown;
    readonly monthsDropdown;
    readonly yearsDropdown;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly addressInput;
    readonly countryDropdown;
    readonly stateInput;
    readonly cityInput;
    readonly zipcodeInput;
    readonly mobileNumberInput;
    readonly createAccountButton;
    readonly accountCreatedText;
    readonly continueButton;

    constructor(private page: Page) {
        this.newUserSignupText = this.page.locator('text=New User Signup!');
        this.signupNameInput = this.page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = this.page.locator('[data-qa="signup-email"]');
        this.signupButton = this.page.locator('[data-qa="signup-button"]');
        this.passwordInput = this.page.locator('[data-qa="password"]');
        this.daysDropdown = this.page.locator('[data-qa="days"]');
        this.monthsDropdown = this.page.locator('[data-qa="months"]');
        this.yearsDropdown = this.page.locator('[data-qa="years"]');
        this.firstNameInput = this.page.locator('[data-qa="first_name"]');
        this.lastNameInput = this.page.locator('[data-qa="last_name"]');
        this.addressInput = this.page.locator('[data-qa="address"]');
        this.countryDropdown = this.page.locator('[data-qa="country"]');
        this.stateInput = this.page.locator('[data-qa="state"]');
        this.cityInput = this.page.locator('[data-qa="city"]');
        this.zipcodeInput = this.page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = this.page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = this.page.locator('[data-qa="create-account"]');
        this.accountCreatedText = this.page.locator('text=Account Created!');
        this.continueButton = this.page.locator('[data-qa="continue-button"]');
    }
    async   navigateToRegistrationPage() {  
        await this.page.goto('https://automationexercise.com/login');
    }
    async verifyNewUserSignupVisible() {
        await expect(this.newUserSignupText).toBeVisible();
    }

    async enterNameAndEmail(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async clickSignupButton() {
        await this.signupButton.click();
    }

    async fillAdditionalDetails(details: RegistrationAdditionalDetails) {
        await this.passwordInput.fill(details.password);
        await this.daysDropdown.selectOption(details.day);
        await this.monthsDropdown.selectOption(details.month);
        await this.yearsDropdown.selectOption(details.year);
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.addressInput.fill(details.address);
        await this.countryDropdown.selectOption(details.country);
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipcodeInput.fill(details.zipCode);
        await this.mobileNumberInput.fill(details.mobileNumber);
    }

    async submitRegistrationForm() {
        await this.createAccountButton.click();
    }

    async verifyAccountCreated() {
        await expect(this.accountCreatedText).toBeVisible();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}