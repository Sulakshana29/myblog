/* ============================================================
   WRITE-UPS — Post cards on the homepage
   Posts come from Hashnode via /api/posts (a Vercel function that
   reads the blog's RSS feed). Write on Hashnode; cards update here
   automatically within about an hour.
   ============================================================ */

const BLOG_URL = 'https://devseccloud.hashnode.dev';
const MAX_POSTS = 6;

export async function initWriteups() {
  const container = document.getElementById('writeups-grid');
  if (!container) return;

  const more = document.getElementById('writeups-more');
  more.href = BLOG_URL;
  more.hidden = false;

  try {
    // /api/posts only runs on Vercel; with `vite dev` it 404s and we show the fallback
    const res = await fetch('/api/posts');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { posts } = await res.json();
    if (!posts?.length) throw new Error('No posts');
    render(container, posts);
  } catch {
    container.innerHTML = `
      <a class="glass-card writeup-card writeup-fallback reveal visible" href="${BLOG_URL}" target="_blank" rel="noopener noreferrer">
        <h3 class="writeup-title">Read my write-ups on Hashnode</h3>
        <p class="writeup-summary">Notes on DevSecOps, cloud infrastructure and security engineering from the projects above.</p>
        <span class="writeup-read">devseccloud.hashnode.dev ↗</span>
      </a>`;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function render(container, posts) {
  container.innerHTML = posts.slice(0, MAX_POSTS).map(post => `
    <a class="glass-card writeup-card reveal visible" href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">
      ${post.cover ? `<img class="writeup-cover" src="${escapeHtml(post.cover)}" alt="" loading="lazy" />` : ''}
      <div class="writeup-meta">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <span>·</span>
        <span>${post.readMin} min read</span>
      </div>
      <h3 class="writeup-title">${escapeHtml(post.title)}</h3>
      <p class="writeup-summary">${escapeHtml(post.summary)}</p>
      <span class="writeup-read">Read on Hashnode ↗</span>
    </a>
  `).join('');
}
