/**
 * Import dependencies from node_modules
 * see commented examples below
 */
// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */
// Import all of Bootstrap’s JS

+(function () {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
})();

// Newsletter form validation
const newsletterForm = document.getElementById("newsletterForm");
const newsletterModal = document.getElementById("newsletterModal");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const email1 = document.getElementById("email");
    const email2 = document.getElementById("email2");
    const email2Feedback = document.getElementById("email2-feedback");

    // Validate tha emails match
    if (email1.value !== email2.value) {
      email2.setCustomValidity("Los emails no coinciden");
      email2Feedback.textContent = "Los emails no coinciden.";
    } else {
      email2.setCustomValidity("");
      email2Feedback.textContent = "Por favor, repite tu email.";
    }

    // Bootstrap style validation
    newsletterForm.classList.add("was-validated");

    // If the form is valid, close it
    if (newsletterForm.checkValidity()) {
      const modal = bootstrap.Modal.getInstance(newsletterModal);
      modal.hide();

      // Reset the form
      newsletterForm.reset();
      newsletterForm.classList.remove("was-validated");

      // Show success message
      alert("¡Gracias por suscribirte a nuestra newsletter!");
    }
  });

  // Resetear validación custom cuando el usuario escribe
  document.getElementById("email2").addEventListener("input", function () {
    this.setCustomValidity("");
  });
}
