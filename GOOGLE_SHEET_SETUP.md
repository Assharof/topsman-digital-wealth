# Google Sheets Integration — Setup Guide

Every lead submitted on the landing page is sent to your Google Sheet automatically.
This takes about 3 minutes to set up.

## Step 1 — Create the sheet

1. Go to [sheets.new](https://sheets.new) to create a new Google Spreadsheet.
2. In row 1, add these headers (optional but recommended):
   `Timestamp | Name | Email | Source`

## Step 2 — Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads") ||
                SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Create the Leads sheet + headers on first run
    if (!SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads")) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
      sheet.appendRow(["Timestamp", "Name", "Email", "Source"]);
    }

    var data = e && e.postData && e.postData.contents
      ? JSON.parse(e.postData.contents)
      : {};

    sheet.appendRow([
      data.timestamp || new Date(),
      data.name || "",
      data.email || "",
      data.source || "landing-page"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click **Save** (the disk icon).

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → choose **Web app**.
3. Set:
   - **Description:** `Lead capture`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy** and **Authorize access** when prompted.
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfyc.../exec`).

## Step 4 — Add the URL to your project

Open the `.env` file in this project and add:

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
```

Save it. Every new lead will now appear as a new row in your sheet.

> Tip: To test it without the website, send a POST request or just submit the form
> on the landing page and check the sheet — a row should appear within a few seconds.
