import { Page, Locator, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DownloadsSubPage extends BasePage {
  readonly downloadCsvReportsButton: Locator;
  readonly downloadedCsvReportDateAndTimeLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.downloadedCsvReportDateAndTimeLabel = page
      .getByTestId('card-text-container-67b1deeba932a347e5a33032')
      .first();
    this.downloadCsvReportsButton = page.getByTestId(
      'download-report-button-67b1deeba932a347e5a33032'
    );
  }

  async clickDownloadReportsButton(): Promise<void> {
    await test.step('Download CSV report', async () => {
      const downloadPromise = this.page.waitForEvent('download');
      await this.downloadCsvReportsButton.click();
      const download = await downloadPromise;

      const reliablePath = '/Users/amielpeled/Documents/Important/' + download.suggestedFilename();
      await download.saveAs(reliablePath);
      await download.delete();
    });
  }
}
