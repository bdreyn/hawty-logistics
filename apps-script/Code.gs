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
const NOTIFY_EMAIL = "brandon@hawtylogistics.com";

// Prevents Sheets from interpreting a submitted value as a formula
// (e.g. "=HYPERLINK(...)") by prefixing it with an apostrophe when it
// starts with a formula-triggering character.
function sanitizeCell(value) {
  const str = String(value || "");
  return /^[=+\-@]/.test(str) ? "'" + str : str;
}

function doPost(e) {
  const params = e.parameter;

  // Honeypot: real users never fill this hidden field, so a non-empty
  // value means the submission came from a bot. Silently drop it.
  if (params.website) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    new Date(),
    sanitizeCell(params.name),
    sanitizeCell(params.email),
    sanitizeCell(params.phone),
    sanitizeCell(params.message),
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New contact form submission from " + (params.name || "website"),
    body:
      "Name: " + (params.name || "") + "\n" +
      "Email: " + (params.email || "") + "\n" +
      "Phone: " + (params.phone || "") + "\n" +
      "Message: " + (params.message || ""),
  });

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
