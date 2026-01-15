# Admin Panel Quick Start

## ⚡ 5-Minute Setup

### 1. Generate Admin Token (30 seconds)

```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

You'll get something like:
```
a3f5c8e2b1d4f7a9c2e5b8d1f4a7c0e3b6f9d2c5a8e1b4f7d0c3a6e9b2f5a8
```

### 2. Add to .env.local (30 seconds)

```bash
# Copy from .env.example
cp .env.example .env.local

# Add this line:
ADMIN_TOKEN=a3f5c8e2b1d4f7a9c2e5b8d1f4a7c0e3b6f9d2c5a8e1b4f7d0c3a6e9b2f5a8
```

### 3. Start Dev Server (1 minute)

```bash
npm run dev
```

### 4. Access Admin Panel (1 minute)

1. Go to: `http://localhost:3000/admin`
2. Paste your admin token
3. Click "Unlock"
4. Start writing!

---

## 📝 Create Your First Post

### Via Admin Panel (easiest)

1. Fill in the form:
   - **Title**: "My First Post"
   - **Description**: "This is my first blog post"
   - **Date**: Pick today's date
   - **Tags**: "first-post, tutorial"
   - **Content**: 
     ```markdown
     # My First Post
     
     Hello world! This is my first blog post.
     ```

2. Click "Publish Post"

3. Your post is now saved at:
   ```
   content/posts/my-first-post.mdx
   ```

4. Visit `http://localhost:3000/blog` to see it!

---

## 🔌 Create Posts via API

### Using cURL

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "API Post",
    "description": "Created via API",
    "date": "2024-01-15",
    "tags": ["api", "automation"],
    "content": "# Created via API\n\nThis post was created through the API!"
  }'
```

### Using JavaScript

```javascript
const token = 'your-admin-token';

const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: 'My API Post',
    description: 'Created programmatically',
    date: '2024-01-15',
    tags: ['api'],
    content: '# My API Post\n\nContent here...',
  }),
});

const data = await response.json();
console.log(data);
```

---

## ✨ Features

✅ Beautiful admin interface
✅ Real-time form validation
✅ MDX support for rich content
✅ Automatic slug generation
✅ Token-based authentication
✅ Error messages with guidance
✅ API endpoint for automation
✅ Works offline after build

---

## 🎯 Common Tasks

### Change Admin Token
Edit `.env.local`:
```env
ADMIN_TOKEN=new-token-here
```

### Edit Existing Posts
Posts are saved as `.mdx` files in `content/posts/`

Edit directly:
```bash
vim content/posts/my-first-post.mdx
```

Or delete and recreate via admin panel.

### View All Posts
```bash
ls content/posts/
```

### Test Posts
```bash
# Rebuild to pick up changes
npm run build

# Or just restart dev server
# Changes auto-detected in dev mode
```

---

## 🐛 Troubleshooting

### "Admin token not working"
- Verify `ADMIN_TOKEN` is in `.env.local` (not `.env.example`)
- Restart dev server after changing `.env.local`
- Token should be the full hex string (64 characters)

### "Slug already exists"
- Each post needs a unique title (slug is generated from title)
- Change the post title or delete the existing post file

### "Post not appearing"
1. Verify it was saved: `ls content/posts/`
2. Check frontmatter is valid (no special characters in title)
3. Refresh the page or rebuild: `npm run build`

### "API returns 401"
- Authorization header missing
- Wrong token
- Token expired (regenerate if changed)

---

## 📚 Documentation

- **[ADMIN_PANEL.md](./ADMIN_PANEL.md)** - Full documentation
- **[ADMIN_PANEL_EXAMPLES.md](./ADMIN_PANEL_EXAMPLES.md)** - Example posts

---

## 🚀 Next Steps

1. Create your first post
2. Try the API with your token
3. Customize the admin form if needed
4. Deploy to production with your admin token

---

## 💡 Tips

- Write posts in Markdown or MDX format
- Use code blocks for syntax highlighting
- Add tags for filtering
- Keep descriptions concise
- Date format must be YYYY-MM-DD

Happy blogging! 📝
