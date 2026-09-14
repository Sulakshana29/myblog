/* ============================================================
   MAIN — Entry point, initialize all modules
   ============================================================ */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initTyping } from './typing.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTyping();
  initProjects();
  initContact();

  // Delay animations slightly for smooth page load
  requestAnimationFrame(() => {
    initAnimations();
  });
});
