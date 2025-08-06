import { expect,Page } from "playwright/test";
import {Locator} from "@playwright/test";

// Page object for the Home Page
export class EditPage {
    readonly fullName:Locator;
    readonly appendText:Locator;
    readonly getMe:Locator;
    readonly clearMe:Locator;
    readonly noEdit:Locator;
    readonly readOnly:Locator;

    readonly page: Page;

    constructor( page: Page) {
        this.page = page;
        this.fullName = this.page.locator('#fullName');
        this.appendText = this.page.locator('#join');
        this.getMe = this.page.locator('#getMe');
        this.clearMe = this.page.locator('#clearMe');
        this.noEdit = this.page.locator('#noEdit');
        this.readOnly = this.page.locator('#dontwrite');
    }

    async navigateToEditPage() {
        await this.page.goto('https://letcode.in/edit',{timeout: 20000});
        await expect(this.page.locator('text=Edit')).toBeVisible();
    }

    async setFullName(fullName: string) {
        await this.fullName.fill(fullName)
    }

    async appendTextAndPressTab(addedText:string) {
        const currentText=await this.appendText.inputValue();
        await this.appendText.fill(currentText+addedText);
        await this.appendText.press('Tab')
    }

    async getInputElement() {
        return await this.getMe.inputValue();
    }

    async clearElement() {
        await this.clearMe.clear({force:true});
    }

    async isNoEditIsDisable() {
        return await this.noEdit.isEnabled()
    }

    async isLastElementReadOnly() {
        return await this.readOnly.isEditable()
    }
}

