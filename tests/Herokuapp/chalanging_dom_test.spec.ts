import {expect, test} from '@playwright/test';
import {EditPage} from "../../Pages/LetCodePages/LetCodeEditPage";
import {ChalangingPage} from "../../Pages/LetCodePages/chalangingPage";

test.describe('Chalanging Dom Tests', () => {
  let chalangingPage: ChalangingPage;
  test.beforeEach(async ({page}) => {
    chalangingPage = new ChalangingPage(page);
  })

  test('clickMiddleButton', async ({ page }) => {
    await chalangingPage.clickMiddleRedButton()
    const currText =await chalangingPage.middleButton.innerText()
    await expect(chalangingPage.middleButton).toHaveText("/bar|qux|baz/")
  });

});
