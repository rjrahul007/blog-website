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

### 3. (Optional) Set Up GitHub Auto-Commit

For automatic GitHub commits when creating posts (recommended for production):

1. Create GitHub Personal Access Token:

   - Go to https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Scopes: Select `repo` (full control of private repositories)
   - Copy the token

2. Add to `.env.local`:

```env
GITHUB_TOKEN=your_github_token
GITHUB_REPO=yourusername/your-repo-name
```

**How it works:**

- When you create a post via admin panel, it automatically commits to GitHub
- GitHub triggers a deployment on Vercel (or your hosting)
- Post goes live automatically - no manual commits needed!

### 4. Access Admin Panel

```
http://localhost:3000/admin
```

Paste your token and click "Unlock" to start creating posts.

---

## How It Works in Production

### Without GitHub Auto-Commit

1. Create post via admin panel
2. Post is saved locally as `.mdx` file
3. **You must manually commit and push to GitHub**
4. GitHub triggers deployment
5. Post goes live

⚠️ **Note:** On Vercel/serverless, files are ephemeral. Without auto-commit, posts disappear on redeployment.

### With GitHub Auto-Commit ✅ (Recommended)

1. Create post via admin panel
2. Post is saved locally as `.mdx` file
3. **API automatically commits to GitHub**
4. GitHub webhook triggers deployment automatically
5. Post goes live instantly

**You never have to commit manually!**

---

## Creating Posts

### Via Admin Panel

1. **Post Title**: The title of your blog post
2. **Description**: Short description for previews (1-2 sentences)
3. **Date**: Publication date (YYYY-MM-DD)
4. **Tags**: Comma-separated tags (e.g., `react, next.js`)
5. **Content**: Write in Markdown or MDX format

Click "Publish Post" and your post is saved to `content/posts/[slug].mdx`

If GitHub is configured, it will auto-commit. Check the response for the `git` status:

```json
{
  "success": true,
  "git": {
    "committed": true,
    "message": "Post committed to GitHub"
  }
}
```

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

````markdown
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
````

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
  },
  "git": {
    "committed": true,
    "message": "Post committed to GitHub"
  }
}
```

The `git` field shows:

- `committed: true` - Post was auto-committed to GitHub
- `committed: false` - Commit failed or not configured (post still saved locally)

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

If using GitHub auto-commit, you must manually commit your edits:

```bash
git add content/posts/my-post.mdx
git commit -m "Update: my-post.mdx"
git push
```

### Delete Posts

```bash
rm content/posts/my-post.mdx
git add content/posts/my-post.mdx
git commit -m "Remove: my-post.mdx"
git push
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

### GitHub Auto-Commit Not Working

- Verify `GITHUB_TOKEN` is set in `.env.local`
- Check token has `repo` scope
- Verify `GITHUB_REPO` format: `owner/repo-name`
- Check post was saved locally first
- Server console will show errors

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

````markdown
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
````

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
   - Don't commit `.env.local` to Git
   - `.gitignore` should include `.env.local`
   - Don't share token publicly

2. **GitHub Token**
   - Create a separate token for this (don't reuse existing ones)
   - Can revoke anytime: https://github.com/settings/tokens
   - Never commit to Git

3. **In Production**
   - Use environment variables from hosting provider
   - Vercel: Settings → Environment Variables
   - Add GITHUB_TOKEN and GITHUB_REPO there
   - Never commit secrets to repository

4. **File Permissions**
   - Ensure `content/posts/` is writable
   - Plan regular backups

---

## Next Steps

1. Generate your token
2. Create your first post
3. Visit `/blog` to see it published
4. Try the API for automation
5. Deploy with your admin token as environment variable

Happy blogging! 📝
```
