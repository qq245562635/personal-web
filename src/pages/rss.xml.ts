import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPublishedPosts } from '../lib/posts';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const root = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), context.site ?? 'http://localhost');

  const items = posts
    .map((post) => {
      const link = new URL(`posts/${post.id}/`, root).href;
      const description = post.data.summary ? `<description>${escapeXml(post.data.summary)}</description>` : '';
      return `<item><title>${escapeXml(post.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${post.data.date.toUTCString()}</pubDate>${description}</item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(SITE.name)}</title><link>${root.href}</link><description>${escapeXml(SITE.description)}</description><language>zh-CN</language>${items}</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
