import { test} from '@playwright/test';
import {EditPage} from "../../Pages/LetCodePages/LetCodeEditPage";


test.describe('User Registration Tests', () => {
  let editPage: EditPage;
  test.beforeEach(async ({page}) => {
    editPage = new EditPage(page);
  })

  test('Register User', async ({ page }) => {
    editPage.navigateToEditPage()


  });
});
