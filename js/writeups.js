/* ============================================================
   WRITE-UPS — Post cards on the homepage
   Shows Hashnode posts (via /api/posts, a Vercel function that reads
   the blog's RSS feed) plus any local posts in posts.js that haven't
   been moved to Hashnode yet (matched by slug).
   ============================================================ */

import { posts, readingTime, formatDate } from './posts.js';

const MAX_POSTS = 6;

export async function initWriteups() {
  const container = document.getElementById('writeups-grid');
  if (!container) return;

  const local = posts.map(post => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    date: post.date,
    readMin: readingTime(post.body),
    tags: post.tags,
    href: `/post.html?p=${post.slug}`,
    external: false,
  }));

  // Render local posts immediately so the section is never empty while Hashnode loads
  render(container, local);

  try {
    // /api/posts only exists on Vercel; locally (vite dev) this 404s and local posts stay
    const res = await fetch('/api/posts');
    if (!res.ok) return;
    const { blog, posts: remotePosts } = await res.json();
    if (!blog || !remotePosts?.length) return;

    const remote = remotePosts.map(p => ({ ...p, href: p.url, tags: [], external: true }));
    const remoteSlugs = new Set(remote.map(p => p.slug));
    render(container, [...remote, ...local.filter(p => !remoteSlugs.has(p.slug))]);

    const more = document.getElementById('writeups-more');
    more.href = blog;
    more.hidden = false;
  } catch {
    // Network/API problem: keep showing local posts
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function render(container, items) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_POSTS);

  container.innerHTML = sorted.map(post => `
    <a class="glass-card writeup-card reveal visible" href="${escapeHtml(post.href)}"${post.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
      <div class="writeup-meta">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <span>·</span>
        <span>${post.readMin} min read</span>
      </div>
      <h3 class="writeup-title">${escapeHtml(post.title)}</h3>
      <p class="writeup-summary">${escapeHtml(post.summary)}</p>
      <div class="writeup-footer">
        <div class="project-card-tags">
          ${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <span class="writeup-read">Read${post.external ? ' on Hashnode ↗' : ' →'}</span>
      </div>
    </a>
  `).join('');
}
