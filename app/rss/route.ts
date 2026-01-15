import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
<item>
<title>${post.title}</title>
<link>${SITE_CONFIG.siteUrl}/blog/${post.slug}</link>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
<description>${post.description}</description>
</item>
`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>${SITE_CONFIG.siteName}</title>
<link>${SITE_CONFIG.siteUrl}</link>
<description>${SITE_CONFIG.siteDescription}</description>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
