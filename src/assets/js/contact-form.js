// Posts the contact form to Formspree (https://formspree.io). Create a
// form at formspree.io, then replace this with your form's endpoint
// (Settings -> Integration -> "Your form's endpoint" URL).
const CONTACT_FORM_ENDPOINT = "REPLACE_WITH_FORMSPREE_ENDPOINT";

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
      // Formspree supports real CORS with a JSON response when asked via
      // the Accept header, so — unlike a no-cors fetch — we can actually
      // tell whether the submission succeeded.
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = "Thanks! We'll be in touch shortly.";
        status.classList.add("success");
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        const message = data && data.errors
          ? data.errors.map((e) => e.message).join(", ")
          : "Something went wrong. Please try again or email us directly.";
        status.textContent = message;
        status.classList.add("error");
      }
    } catch (err) {
      status.textContent = "Something went wrong. Please try again or email us directly.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
    }
  });
});
