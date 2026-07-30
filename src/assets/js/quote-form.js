// Replace with the deployed Google Apps Script Web App URL (see README for setup steps).
const QUOTE_FORM_ENDPOINT = "https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec";

(function () {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const status = document.getElementById("quote-form-status");

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
