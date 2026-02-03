import test, { expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { excelWrite } from "./excelPractise";

test.describe("End to End Excel", () => {
  test("Download excel then save to folder and Upload Updated Excel", async ({
    page,
  }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const download_btn = page.locator("#downloadButton");
    const upload_btn = page.locator("#fileinput");
    const update_alrt = page.locator("div[role='alert']");
    const headers = page.locator("[role='columnheader'] div");
    //  Make a folder inside your project
    const downloadDir = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      download_btn.click(),
    ]);

    const fileName = download.suggestedFilename(); // e.g. "download.xlsx"
    const filePath = path.join(downloadDir, fileName);

    await download.saveAs(filePath);
    const { savedTo, updatedCell } = await excelWrite(
      filePath,
      "fruit_name",
      "Kivi",
      "Pomegranate"
    );
    await upload_btn.click();
    await upload_btn.setInputFiles(savedTo);
    const alert_txt = await update_alrt.textContent();
    expect(alert_txt).toBe("Updated Excel Data Successfully.");
    const headerTexts = (await headers.allTextContents()).map((h) => h.trim());

    const columnIndex = headerTexts.findIndex(
      (h) => h.toLowerCase() === "fruit name".toLowerCase()
    );

    if (columnIndex === -1) {
      throw new Error(
        `Column "Fruit Name" not found. Found: ${headerTexts.join(" | ")}`
      );
    }

    const rows = page.locator("div[role='rowgroup'] div[role='row']");

    const matchingRow = rows
      .filter({
        has: page
          .locator("div[role='cell']")
          .nth(columnIndex)
          .getByText("Pomegranate", { exact: true }),
      })
      .first();

    await expect(matchingRow).toHaveCount(1);

    await expect(
      matchingRow.locator("div[role='cell']").nth(columnIndex)
    ).toHaveText("Pomegranate");
  });
});
