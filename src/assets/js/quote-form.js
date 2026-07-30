// Replace with the deployed Google Apps Script Web App URL (see README for setup steps).
const QUOTE_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxf9NDk6GDjE8A-6Y-EAtNbxxwajeksGTEgvXWidTf4zhOwfZ0eBSIBrVWPj5EwOO8g/exec";

(function () {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const status = document.getElementById("quote-form-status");
  const quoteFields = document.getElementById("quote-fields");
  const messageLabel = document.getElementById("message-label");

  function updateFieldsForRequestType() {
    const requestType = form.querySelector("input[name=requestType]:checked").value;
    const isQuote = requestType === "quote";
    quoteFields.classList.toggle("hidden", !isQuote);
    messageLabel.textContent = isQuote ? "Additional Details" : "Message";
  }

  form.querySelectorAll("input[name=requestType]").forEach((radio) => {
    radio.addEventListener("change", updateFieldsForRequestType);
  });
  updateFieldsForRequestType();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    status.textContent = "Sending...";
    status.className = "text-sm text-gray-500";

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // Apps Script Web Apps don't return readable CORS responses for simple
      // fetch requests, so we send with no-cors and treat a completed request
      // (no network error) as success. See README for details/limitations.
      await fetch(QUOTE_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });

      form.reset();
      status.textContent = "Thanks! We received your request and will be in touch soon.";
      status.className = "text-sm text-green-600";
    } catch (error) {
      status.textContent = "Something went wrong. Please try again or call us directly.";
      status.className = "text-sm text-red-600";
    } finally {
      submitButton.disabled = false;
    }
  });
})();
