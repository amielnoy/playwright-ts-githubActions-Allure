import {Locator} from "@playwright/test";
import {Page} from "playwright/test";

export class EditPage {
    readonly fullName: Locator;
    readonly appendText: Locator;
    readonly getMe: Locator;
    readonly clearMe: Locator;
    readonly noEdit: Locator;
    readonly readOnly: Locator;

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.firstUpperButton = this.page.locator('a.button.alert');
    }
}
