/* ============================================================
   TYPING EFFECT — Hero subtitle animation
   ============================================================ */

export function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = [
    'DevOps Engineer',
    'AWS & Terraform',
    'CI/CD & Kubernetes',
    'DevSecOps',
    'Application Security',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  // Start after a brief delay
  setTimeout(type, 600);
}
