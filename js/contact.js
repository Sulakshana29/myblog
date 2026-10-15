/* ============================================================
   CONTACT FORM — Validation & Submission
   ============================================================ */

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });

  // Clear error on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      group.classList.remove('error');
    });
  });
}

function validateForm() {
  let isValid = true;

  const name = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const message = document.getElementById('contact-message');

  // Name
  if (!name.value.trim()) {
    document.getElementById('form-group-name').classList.add('error');
    isValid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    document.getElementById('form-group-email').classList.add('error');
    isValid = false;
  }

  // Message
  if (!message.value.trim()) {
    document.getElementById('form-group-message').classList.add('error');
    isValid = false;
  }

  return isValid;
}

const CONTACT_EMAIL = 'sula2001karunarathne@gmail.com';

// No backend yet: hand the message to the visitor's email client so nothing is silently lost.
// To send directly instead, POST the fields to a form service (Formspree / Web3Forms) here.
function submitForm() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const subject = `Portfolio contact from ${name}`;
  const body = `${message}\n\n— ${name} (${email})`;

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  showToast(`Opening your email app… If nothing opens, email me at ${CONTACT_EMAIL}`, 'success');
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
