/* ============================================================
   /api/posts — Vercel serverless function
   Reads the Hashnode RSS feed server-side (the feed has no CORS
   headers and Hashnode's GraphQL API now needs a paid plan) and
   returns the latest posts as JSON for the Write-ups section.
   ============================================================ */

// Your Hashnode blog address, e.g. 'sulakshana.hashnode.dev' (or a custom domain).
// Leave empty until the blog exists; the site then shows only local posts.
export const HASHNODE_HOST = '';
const MAX_POSTS = 6;

export default async function handler(req, res) {
  if (!HASHNODE_HOST) {
    res.status(200).json({ blog: null, posts: [] });
    return;
  }

  try {
    const feed = await fetch(`https://${HASHNODE_HOST}/rss.xml`, {
      headers: { 'User-Agent': 'portfolio-writeups/1.0' },
    });
    if (!feed.ok) throw new Error(`RSS ${feed.status}`);

    const posts = parseRss(await feed.text()).slice(0, MAX_POSTS);

    // Cache at Vercel's edge for an hour; serve stale for a day while refreshing
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ blog: `https://${HASHNODE_HOST}`, posts });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}

export function parseRss(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return items.map(item => {
    const url = tag(item, 'link');
    const content = tag(item, 'content:encoded');
    const words = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return {
      slug: url.replace(/\/+$/, '').split('/').pop(),
      title: tag(item, 'title'),
      summary: tidySummary(tag(item, 'description')),
      url,
      date: new Date(tag(item, 'pubDate')).toISOString().slice(0, 10),
      readMin: Math.max(1, Math.round(words / 220)),
      cover: (item.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] || null,
    };
  });
}

function tag(item, name) {
  const m = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  if (!m) return '';
  const raw = m[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : decodeEntities(raw);
}

// Hashnode cuts the RSS description at ~200 chars, often mid-word
function tidySummary(s) {
  const text = s.trim();
  if (text.length < 190 || /[.!?]$/.test(text)) return text;
  return text.slice(0, text.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
}

function decodeEntities(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}
