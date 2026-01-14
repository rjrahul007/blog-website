import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
<item>
<title>${post.title}</title>
<link>https://yourdomain.com/blog/${post.slug}</link>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
<description>${post.description}</description>
</item>
`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>Sam’s Blog</title>
<link>https://yourdomain.com</link>
<description>Thoughts on engineering and AI</description>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
