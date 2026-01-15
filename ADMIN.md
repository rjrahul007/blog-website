# Admin Panel Documentation

## Quick Start (5 minutes)

### 1. Generate Admin Token

```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 2. Add to .env.local

```env
ADMIN_TOKEN=your-generated-token-here
```

### 3. Access Admin Panel

```
http://localhost:3000/admin
```

Paste your token and click "Unlock" to start creating posts.

---

## Creating Posts

### Via Admin Panel

1. **Post Title**: The title of your blog post
2. **Description**: Short description for previews (1-2 sentences)
3. **Date**: Publication date (YYYY-MM-DD)
4. **Tags**: Comma-separated tags (e.g., `react, next.js`)
5. **Content**: Write in Markdown or MDX format

Click "Publish Post" and your post is saved to `content/posts/[slug].mdx`

### Via API

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My Post",
    "description": "Short description",
    "date": "2024-01-15",
    "tags": ["tag1", "tag2"],
    "content": "# Content here..."
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch("/api/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: "My Post",
    description: "Short description",
    date: "2024-01-15",
    tags: ["tag1", "tag2"],
    content: "# Content here...",
  }),
});

const data = await response.json();
console.log(data);
```

---

## MDX Format

Write posts using standard Markdown or MDX:

```markdown
# Heading 1

## Heading 2

**Bold** and _italic_ text

- List item 1
- List item 2

[Link](https://example.com)

```javascript
// Code blocks
const hello = "world";
```

> Blockquotes

<CustomComponent prop="value" />
```

---

## API Reference

### POST /api/posts

**Headers**:
- `Authorization: Bearer TOKEN` (required)
- `Content-Type: application/json`

**Request Body**:

```typescript
{
  title: string;        // Required
  description: string;  // Required
  date: string;        // Required (YYYY-MM-DD)
  tags?: string[];     // Optional
  content: string;     // Required
}
```

**Response Codes**:
- `201`: Success
- `400`: Validation error
- `401`: Unauthorized
- `409`: Slug already exists
- `500`: Server error

**Success Response (201)**:

```json
{
  "success": true,
  "message": "Blog post saved successfully",
  "post": {
    "slug": "my-post",
    "title": "My Post",
    "date": "2024-01-15",
    "tags": ["tag1"]
  }
}
```

---

## File Structure

Posts are stored as MDX files:

```
content/posts/
├── my-first-post.mdx
├── react-hooks.mdx
└── next-js-tutorial.mdx
```

Each file contains frontmatter and content:

```mdx
---
title: "My Post"
description: "Description"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---

# Your content here

This is your blog post content in MDX format.
```

---

## Managing Posts

### List All Posts

```bash
ls content/posts/
```

### Edit Posts

Posts are plain `.mdx` files - edit them directly:

```bash
vim content/posts/my-post.mdx
```

### Delete Posts

```bash
rm content/posts/my-post.mdx
```

### Change Admin Token

Update `.env.local`:

```env
ADMIN_TOKEN=new-token-here
```

Restart the dev server.

---

## Common Tasks

### Bulk Import Posts

```typescript
const posts = [
  {
    title: "Post 1",
    description: "...",
    date: "2024-01-01",
    tags: ["tag1"],
    content: "...",
  },
  // ... more posts
];

for (const post of posts) {
  await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
}
```

### Generate Different Slugs

Slugs are auto-generated from titles:
- Lowercased
- Special characters removed
- Spaces converted to hyphens

Example: `"My First React Post!"` → `my-first-react-post`

---

## Troubleshooting

### Token Not Working

- Verify `ADMIN_TOKEN` is in `.env.local`
- Restart dev server after changing
- Token should be 64 characters (hex string)

### "Slug Already Exists"

- Change post title to generate different slug
- Or delete existing post: `rm content/posts/old-slug.mdx`

### Post Not Appearing

1. Verify it exists: `ls content/posts/`
2. Check frontmatter is valid YAML
3. Rebuild: `npm run build`
4. Refresh browser

### API Returns 401

- Authorization header missing
- Wrong token
- Verify format: `Authorization: Bearer TOKEN`

### API Returns 500

- Check server console for error details
- Verify `content/posts/` directory exists
- Check file system permissions

---

## Example Post

**Title**: Getting Started with Next.js 14

**Description**: Learn the fundamentals of Next.js 14

**Date**: 2024-01-15

**Tags**: next.js, react, tutorial

**Content**:

```markdown
# Getting Started with Next.js 14

Next.js 14 brings powerful new features for building modern web applications.

## Why Next.js?

- Built on React
- File-based routing
- API routes
- Server components
- Automatic optimization

## Installation

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## Your First Page

Create `app/page.tsx`:

```typescript
export default function Home() {
  return <h1>Hello World</h1>;
}
```

## Key Features

1. **App Router**: Modern file-based routing
2. **Server Components**: Run code on the server
3. **API Routes**: Built-in backend
4. **Image Optimization**: Automatic image handling

## Next Steps

- Learn about Server Components
- Explore API routes
- Build a full-stack application
```

---

## Security Notes

1. **Keep Token Secret**
   - Don't commit `.env.local`
   - Don't share token publicly
   - Regenerate if compromised

2. **In Production**
   - Use proper JWT or session auth
   - Add rate limiting
   - Enable HTTPS
   - Implement request logging

3. **File Permissions**
   - Ensure `content/posts/` is writable
   - Plan backup strategy

---

## Next Steps

1. Generate your token
2. Create your first post
3. Visit `/blog` to see it published
4. Try the API for automation
5. Deploy with your admin token as environment variable

Happy blogging! 📝
