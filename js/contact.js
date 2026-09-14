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

function submitForm() {
  const submitBtn = document.getElementById('contact-submit');
  const originalContent = submitBtn.innerHTML;

  // Animate button
  submitBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
    Sending...
  `;
  submitBtn.disabled = true;

  // Add spin animation
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);

  // Simulate sending (replace with real API call)
  setTimeout(() => {
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Message Sent!
    `;

    showToast('Message sent successfully! I\'ll get back to you soon.', 'success');

    // Reset form
    document.getElementById('contact-form').reset();

    // Reset button after delay
    setTimeout(() => {
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }, 3000);
  }, 1500);
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
