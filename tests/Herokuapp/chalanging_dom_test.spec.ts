import {expect, test} from '@playwright/test';
import {ChalangingPage} from "../../Pages/LetCodePages/chalangingPage";

test.describe('Chalanging Dom Tests', () => {
  let chalangingPage: ChalangingPage;
  test.beforeEach(async ({page}) => {
    chalangingPage = new ChalangingPage(page);
  })

  test('clickMiddleButton', async ({ page }) => {
    await chalangingPage.gotoHomePage();

    await chalangingPage.clickMiddleRedButton()
    await expect(chalangingPage.middleButton).toHaveText(new RegExp("bar|qux|baz|foo"))

    await chalangingPage.clickUpperBlueButton()
    await expect(chalangingPage.upperButton).toHaveText(new RegExp("bar|foo|baz|qux"))

    await chalangingPage.clickBottomRedButton()
    await expect(chalangingPage.bottomButton).toHaveText(new RegExp("bar|foo|baz|qux"))

    await chalangingPage.getTableEdit(3).click()
  });
});
