/* ============================================================
   POST PAGE — Renders a single write-up from ?p=<slug>
   ============================================================ */

import { posts, readingTime, formatDate } from './posts.js';

const PROJECT_NAMES = {
  1: 'Deal Aggregator',
  6: 'Cloud Policy Guard',
};

document.addEventListener('DOMContentLoaded', () => {
  const slug = new URLSearchParams(window.location.search).get('p');
  const post = posts.find(p => p.slug === slug);
  const article = document.getElementById('post');

  document.getElementById('footer-year').textContent = new Date().getFullYear();

  if (!post) {
    document.title = 'Post not found — Sulakshana Karunarathne';
    article.innerHTML = `
      <h1 class="post-title">Post not found</h1>
      <p class="post-lead">That write-up doesn't exist (or has moved). <a href="/#writeups">See all write-ups →</a></p>
    `;
    return;
  }

  document.title = `${post.title} — Sulakshana Karunarathne`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.summary);

  const projectName = PROJECT_NAMES[post.project];

  article.innerHTML = `
    <div class="post-meta">
      <time datetime="${post.date}">${formatDate(post.date)}</time>
      <span>·</span>
      <span>${readingTime(post.body)} min read</span>
    </div>
    <h1 class="post-title">${post.title}</h1>
    <p class="post-lead">${post.summary}</p>
    <div class="project-card-tags post-tags">
      ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="post-body">${post.body}</div>
    ${projectName ? `
    <div class="post-project glass-card">
      <span>This write-up is about</span>
      <strong>${projectName}</strong>
      <a href="/#projects" class="btn btn-sm btn-secondary">See the project</a>
    </div>` : ''}
  `;
});
