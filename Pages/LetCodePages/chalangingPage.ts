import {Locator, test} from "@playwright/test";
import {Page} from "playwright/test";

export class ChalangingPage {
    readonly middleButton: Locator;
    readonly upperButton: Locator
    readonly bottomButton:Locator

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.middleButton = this.page.locator("a.button.alert")
        this.upperButton = this.page.locator('a.button').first();
        this.bottomButton = this.page.locator("a.button.success")
    }

    getTableEdit(line: number,): Locator {
        return this.page.locator("//tr["+line+"]/td[7]/a[1]")
    }

    getTableDelete(line: number,): Locator {
        return this.page.locator("//tr["+line+"]/td[7]/a[2]")
    }

    async gotoHomePage() {
        await this.page.goto("https://the-internet.herokuapp.com/challenging_dom");
    }

    async clickUpperBlueButton(){
        await test.step("clicking upper blue button", async () => {
            await this.upperButton.click();
        })
    }

    async clickMiddleRedButton(){
        await test.step("clicking middle red button", async () => {
            await this.middleButton.click();
        })
    }

    async clickBottomRedButton(){
        await test.step("clicking lower green button", async () => {
            await this.bottomButton.click();
        })
    }
}
