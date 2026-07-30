// Paste this into Extensions > Apps Script on the Google Sheet that will
// collect quote requests and general inquiries, then deploy as a Web App
// (see README).
const NOTIFY_EMAIL = "brandon@hawtylogistics.com";

// Prevents Sheets from interpreting a submitted value as a formula
// (e.g. "=HYPERLINK(...)") by prefixing it with an apostrophe when it
// starts with a formula-triggering character.
function sanitizeCell(value) {
  const str = String(value || "");
  return /^[=+\-@]/.test(str) ? "'" + str : str;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Honeypot: real users never fill this hidden field, so a non-empty
  // value means the submission came from a bot. Silently drop it.
  if (data.website) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const isQuote = data.requestType === "quote";

  sheet.appendRow([
    new Date(),
    isQuote ? "Quote" : "General Inquiry",
    sanitizeCell(data.name),
    sanitizeCell(data.email),
    sanitizeCell(data.phone),
    sanitizeCell(data.origin),
    sanitizeCell(data.destination),
    sanitizeCell(data.cargo),
    sanitizeCell(data.message),
  ]);

  const subjectPrefix = isQuote ? "New quote request from " : "New general inquiry from ";
  let body =
    "Type: " + (isQuote ? "Quote Request" : "General Inquiry") + "\n" +
    "Name: " + (data.name || "") + "\n" +
    "Email: " + (data.email || "") + "\n" +
    "Phone: " + (data.phone || "") + "\n";

  if (isQuote) {
    body +=
      "Origin: " + (data.origin || "") + "\n" +
      "Destination: " + (data.destination || "") + "\n" +
      "Cargo: " + (data.cargo || "") + "\n";
  }

  body += "Message: " + (data.message || "");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subjectPrefix + (data.name || "website"),
    body: body,
  });

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
