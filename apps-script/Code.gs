/**
 * Hawty Logistics — Contact Form → Google Sheets
 *
 * Setup:
 * 1. Create a Google Sheet with a header row: Timestamp | Name | Email | Phone | Message
 * 2. Extensions -> Apps Script, paste this file's contents in as Code.gs.
 * 3. Deploy -> New deployment -> type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL into CONTACT_FORM_ENDPOINT in
 *    src/assets/js/contact-form.js.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const params = e.parameter;

  sheet.appendRow([
    new Date(),
    params.name || "",
    params.email || "",
    params.phone || "",
    params.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
