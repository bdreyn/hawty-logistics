// Posts the contact form to a Google Apps Script Web App, which appends
// each submission as a row in a Google Sheet. See README.md and
// apps-script/Code.gs for setup instructions.
//
// Replace this with your deployed Apps Script Web App URL.
const CONTACT_FORM_ENDPOINT = "REPLACE_WITH_APPS_SCRIPT_WEB_APP_URL";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "contact-form-status";

    if (CONTACT_FORM_ENDPOINT.startsWith("REPLACE_WITH")) {
      status.textContent = "Form isn't connected yet — set CONTACT_FORM_ENDPOINT in contact-form.js.";
      status.classList.add("error");
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    status.textContent = "Sending…";

    try {
      // Apps Script Web Apps don't send browser-readable CORS headers to
      // plain fetch requests, so we use no-cors and treat completion of
      // the request (not the response body) as success.
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form),
      });

      status.textContent = "Thanks! We'll be in touch shortly.";
      status.classList.add("success");
      form.reset();
    } catch (err) {
      status.textContent = "Something went wrong. Please try again or email us directly.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
    }
  });
});
