import {expect, test} from '@playwright/test';
import {EditPage} from "../../Pages/LetCodePages/LetCodeEditPage";

test.describe('User Registration Tests', () => {
  let editPage: EditPage;
  test.beforeEach(async ({page}) => {
    editPage = new EditPage(page);
  })

  test('Register User', async ({ page }) => {
    await editPage.navigateToEditPage()
    await editPage.setFullName("amiel peled")
    const fullName=await editPage.fullName.inputValue()
    expect(fullName).toContain("amiel peled")

    await editPage.appendTextAndPressTab("added")
    const newStr=await editPage.appendText.inputValue()
    await expect(newStr).toBe("I am goodadded");

    const expected="ortonikc"
    await expect(await editPage.getInputElement()).toBe(expected)

    await editPage.clearElement();
    await expect(editPage.clearMe).toHaveText("")

    await expect(await editPage.isNoEditIsDisable()).toBe(false)

    await expect(await editPage.isLastElementReadOnly()).toBe(false)
  });

});
