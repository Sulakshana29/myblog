/* ============================================================
   WRITE-UPS — Post cards on the homepage
   ============================================================ */

import { posts, readingTime, formatDate } from './posts.js';

export function initWriteups() {
  const container = document.getElementById('writeups-grid');
  if (!container) return;

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  container.innerHTML = sorted.map(post => `
    <a class="glass-card writeup-card reveal" href="/post.html?p=${post.slug}">
      <div class="writeup-meta">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <span>·</span>
        <span>${readingTime(post.body)} min read</span>
      </div>
      <h3 class="writeup-title">${post.title}</h3>
      <p class="writeup-summary">${post.summary}</p>
      <div class="writeup-footer">
        <div class="project-card-tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <span class="writeup-read">Read →</span>
      </div>
    </a>
  `).join('');
}
