// Paste this into Extensions > Apps Script on the Google Sheet that will
// collect quote requests and general inquiries, then deploy as a Web App
// (see README).
const NOTIFY_EMAIL = "info@hawtylogistics.com";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const isQuote = data.requestType === "quote";

  sheet.appendRow([
    new Date(),
    isQuote ? "Quote" : "General Inquiry",
    data.name || "",
    data.email || "",
    data.phone || "",
    data.origin || "",
    data.destination || "",
    data.cargo || "",
    data.message || "",
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
