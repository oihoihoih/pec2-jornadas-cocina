/**
 * Import dependencies from node_modules
 * see commented examples below
 */
// Import all of Bootstrap’s JS
import { auto, clippingParents } from "@popperjs/core";
import * as bootstrap from "bootstrap";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// GSAP Animations for home page
let split = new SplitText(".home-grid__title", { type: "chars" });

const homeItems = document.querySelectorAll(".home-grid__content > *");

gsap.from(split.chars, {
  y: 100,
  autoAlpha: 0,
  stagger: 0.1,
});

for (let i = 0; i < homeItems.length; i++) {
  gsap.from(homeItems[i], {
    y: 100,
    autoAlpha: 0,
    delay: 0.5 + i * 0.2,
  });
}

// Animations for speakers page
gsap.from(".card", {
  y: 100,
  autoAlpha: 0,
  stagger: 0.1,
});

// Animations for blog page
gsap.from(".blog-post, .contact-grid, .home-grid, speakers", {
  autoAlpha: 0,
  duration: 1,
});

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

const current = location.pathname;

document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === current) {
    console.log(link.getAttribute("href"), current);
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// Contact-form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[data-netlify='true']");
  const fields = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", (event) => {
    let isValid = true;

    fields.forEach((field) => {
      const errorSpan = document.getElementById(`error-${field.id}`);
      errorSpan.textContent = "";

      if (!field.checkValidity()) {
        isValid = false;

        // Custom messages
        if (field.validity.valueMissing) {
          errorSpan.textContent = "Este campo es obligatorio.";
        } else if (field.validity.typeMismatch) {
          errorSpan.textContent = "Introduce un formato válido.";
        } else if (field.validity.patternMismatch) {
          errorSpan.textContent = "Introduce un número de teléfono válido.";
        }
      }
    });

    if (!isValid) {
      event.preventDefault(); 
    }
  });
});
