// Paste this into Extensions > Apps Script on the Google Sheet that will
// collect quote requests, then deploy as a Web App (see README).
const NOTIFY_EMAIL = "info@hawtylogistics.com";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.origin || "",
    data.destination || "",
    data.cargo || "",
    data.message || "",
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New quote request from " + (data.name || "website"),
    body:
      "Name: " + (data.name || "") + "\n" +
      "Email: " + (data.email || "") + "\n" +
      "Phone: " + (data.phone || "") + "\n" +
      "Origin: " + (data.origin || "") + "\n" +
      "Destination: " + (data.destination || "") + "\n" +
      "Cargo: " + (data.cargo || "") + "\n" +
      "Message: " + (data.message || ""),
  });

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
