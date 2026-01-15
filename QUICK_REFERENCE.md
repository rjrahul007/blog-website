# Quick Reference Guide

## 🚀 Getting Started

### 1. Copy Environment Variables
```bash
cp .env.example .env.local
```

### 2. Update Your Domain
Edit `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourblog.com
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
```

### 3. Build & Deploy
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx         ← Global metadata + JSON-LD schemas
│   ├── page.tsx           ← Home page
│   ├── blog/
│   │   ├── page.tsx       ← Blog list
│   │   └── [slug]/
│   │       └── page.tsx   ← Individual post + BlogPosting schema
│   ├── robots.ts          ← Robots.txt configuration
│   ├── sitemap.ts         ← Dynamic XML sitemap
│   └── rss/
│       └── route.ts       ← RSS feed (uses config)
├── lib/
│   ├── config.ts          ← ALL configuration centralized here
│   ├── metadata.ts        ← JSON-LD schema generators
│   ├── posts.ts           ← Post loading logic
│   └── schema.ts          ← Zod schemas for validation
├── components/
│   ├── Search.tsx         ← Typed search component
│   ├── giscus.tsx         ← Comments (uses config)
│   └── ...
├── .env.example           ← Template for environment variables
└── IMPLEMENTATION_SUMMARY.md
```

---

## ⚙️ Configuration

All configuration is in `lib/config.ts`. To access:

```typescript
import { SITE_CONFIG } from "@/lib/config";

// Access any config value:
SITE_CONFIG.siteUrl           // http://localhost:3000
SITE_CONFIG.siteName          // Sam | Blog
SITE_CONFIG.author            // Rahul
SITE_CONFIG.email             // rjrahool007@gmail.com
SITE_CONFIG.socialLinks.github
SITE_CONFIG.giscus.repoId
```

### Environment Variables
Set in `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Blog domain URL |
| `NEXT_PUBLIC_SITE_NAME` | Blog title |
| `NEXT_PUBLIC_AUTHOR_NAME` | Author name |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | GitHub repo ID for comments |
| `NEXT_PUBLIC_GITHUB_URL` | Your GitHub profile |

---

## 🔍 Key Features

### ✅ SEO
- Automatic sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- JSON-LD rich snippets
- OpenGraph social previews
- Twitter Card support

### ✅ Security
- XSS protection headers
- Clickjacking prevention
- MIME type sniffing protection
- Referrer policy enforcement

### ✅ Search
- Full-text search with fuzzy matching
- Filter by tags
- Beautiful dropdown UI
- Type-safe implementation

### ✅ Configuration
- Centralized config management
- Environment-based customization
- No hardcoded values
- Type-safe access

---

## 📝 Adding a Blog Post

1. Create `content/posts/your-post.mdx`:
```mdx
---
title: "Your Post Title"
description: "Short description for previews"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---

Your content here...
```

2. The post will automatically appear in:
   - Blog list at `/blog`
   - Latest posts on homepage
   - Search results
   - RSS feed
   - Sitemap

---

## 🔧 Development

### Build
```bash
npm run build
```

### Dev Server
```bash
npm run dev
# Open http://localhost:3000
```

### Lint
```bash
npm run lint
```

### RSS Feed
```
http://localhost:3000/rss
```

### Sitemap
```
http://localhost:3000/sitemap.xml
```

### Robots.txt
```
http://localhost:3000/robots.txt
```

---

## 🎨 Search Component

### Usage
```tsx
import { Search } from "@/components/Search";
import { getAllPosts } from "@/lib/posts";

export default function MyComponent() {
  const posts = getAllPosts();
  
  return (
    <Search 
      posts={posts}
      onClose={() => console.log("Search closed")}
    />
  );
}
```

### Features
- Fuzzy search across title, description, tags
- Beautiful dropdown with tag display
- Keyboard friendly
- Dark mode support

---

## 📊 SEO Verification

### Check Sitemap
```bash
curl http://localhost:3000/sitemap.xml
```

### Check Robots.txt
```bash
curl http://localhost:3000/robots.txt
```

### Check Schemas
Open DevTools → Elements → Search for `<script type="application/ld+json"`

### Test Rich Snippets
Use Google's Rich Results Test:
https://search.google.com/test/rich-results

---

## 🚨 Troubleshooting

### Build Fails
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

### SEO Not Indexed
- Check `.env.local` has `NEXT_PUBLIC_SITE_URL` set
- Verify robots.txt is accessible
- Submit sitemap to Google Search Console

### Search Not Working
- Verify posts have valid frontmatter
- Check `PostSchema` validation in `lib/schema.ts`

### Comments Not Loading
- Verify `NEXT_PUBLIC_GISCUS_REPO_ID` in `.env.local`
- Check Giscus settings in GitHub

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org)
- [Zod Validation](https://zod.dev)
- [JSON-LD Docs](https://json-ld.org)
- [MDX Documentation](https://mdxjs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✨ What Was Improved

✅ Removed all hardcoded values
✅ Added centralized configuration
✅ Enhanced SEO with sitemaps & schemas
✅ Improved security with headers
✅ Fixed TypeScript issues
✅ Rewrote Search component
✅ Added proper metadata
✅ Zero breaking changes

---

## 🎯 Next Steps (Optional)

1. Test in production environment
2. Update social links if different
3. Add custom domain
4. Submit to Google Search Console
5. Monitor search performance

---

Created: January 15, 2026
Last Updated: With all improvements implemented and tested ✅
