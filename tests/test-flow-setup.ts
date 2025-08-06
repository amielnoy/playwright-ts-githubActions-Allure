import {LoginBuildingBlock} from "../BuildingBlocks/loginBuildingBlock";
import {MainPage} from "../Pages/MainPages/MainCymulatePage";
import {ReportsPage} from "../Pages/ReportsPage";
import {WafReportsPage} from "../Pages/WafReports/WafReportsPage";
import {DateAndTimeUtility} from "../Utils/DateAndTime";
import {expect} from "@playwright/test";
import {GlobalConstants} from "../Globals/global-constants";

export async function testFlowSetup(loginBuildingBlock: LoginBuildingBlock,mainPage: MainPage,
                              reportsPage: ReportsPage,wafReportsPage: WafReportsPage
) {
        await loginBuildingBlock.signIn();

        await expect(mainPage.reportsTabButton).toBeEnabled()
        await mainPage.clickReportsTabButton();

        await expect(reportsPage.webApplicationFirewallHistoryButton).toBeEnabled()
        await reportsPage.clickWebApplicationFireWallHistoryButton();
        await expect(wafReportsPage.getRowWithCompletedSibling()).toBeEnabled()
        await wafReportsPage.clickRowWithCompletedSibling();
}


export async function navigateToWAFReportHistory(mainPage: MainPage, reportsPage: ReportsPage, wafReportsPage: WafReportsPage) {
    await expect(mainPage.reportsTabButton).toBeEnabled();
    await mainPage.clickReportsTabButton();

    await expect(reportsPage.webApplicationFirewallHistoryButton).toBeEnabled();
    await reportsPage.clickWebApplicationFireWallHistoryButton();

    const rowWithCompletedSibling = wafReportsPage.getRowWithCompletedSibling();
    await expect(rowWithCompletedSibling).toBeEnabled();
    await wafReportsPage.clickRowWithCompletedSibling();
}

export async function downloadReport(mainPage: MainPage, wafReportsPage: WafReportsPage) {
        //const dateTimeUtility = new DateAndTimeUtility();

        await wafReportsPage.generateReportSubPage.csvButton.click();
        await mainPage.mainCymulateSubMenuPage.clickDownloadReportsButton();

        await expect(mainPage.reportAddedSuccessMessage).toBeVisible({timeout: GlobalConstants.MEDIUM_TIMEOUT});
        const expectedReportTextLine1 = 'Module - Web Application FirewallAssessment generated at'
        //const expectedReportTextLine2 =  `${dateTimeUtility.getCurrentDate()} ${dateTimeUtility.getCurrentTime()}}`;
        await expect(mainPage.downloadsSubPage.downloadedCsvReportDateAndTimeLabel).toContainText(expectedReportTextLine1);
        await mainPage.downloadsSubPage.clickDownloadReportsButton();
}
