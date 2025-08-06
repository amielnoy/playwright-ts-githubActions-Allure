import { test } from '@playwright/test';
import { generateBigRandomNumber } from '../Utils/randomNumberGenerator';
import { HomePage } from '../Pages/HomePage';
import { RegistrationPage } from '../Pages/RegistrationPage';
import { regAdditionalDetails } from "../Data/registration_details";
import { UserApiClient } from '../api-client/UserApiClient';

test.describe('User Registration Tests', () => {
  test('Register User', async ({ page, request }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    const userApiClient = new UserApiClient(request);

    // Generate test data
    const testName = 'Test User';
    const testEmail = generateBigRandomNumber() + '@example.com';

    // Save the generated email to the .env file
    const fs = require('fs');
    fs.appendFileSync('.env', `LAST_GENERATED_EMAIL=${testEmail}\n`, 'utf-8');

    // Use API to register initial details
    await userApiClient.registerInitialDetails(testName, testEmail);

    await registrationPage.navigateToRegistrationPage();

    // Step 7: Click 'Signup' button
    await registrationPage.clickSignupButton();

    // Step 8: Fill out additional registration details
    await registrationPage.fillAdditionalDetails(regAdditionalDetails);

    // Step 9: Submit the registration form
    await registrationPage.submitRegistrationForm();

    // Step 10: Verify account creation success
    await registrationPage.verifyAccountCreated();

    // Step 11: Click 'Continue' button
    await registrationPage.clickContinueButton();

    // Step 12: Verify user is logged in
    await homePage.verifyUserLoggedIn('Test User');

    // Step 13: Delete the account
    await homePage.deleteAccount();

    // Step 14: Verify account deletion success
    await homePage.verifyAccountDeleted();
  });
});
