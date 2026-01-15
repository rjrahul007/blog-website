# Admin Panel Setup & Usage Guide

## 🔐 Setup

### 1. Generate Admin Token
Generate a secure token for authentication:

```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows PowerShell
[Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 2. Add to Environment
Add to `.env.local`:
```env
ADMIN_TOKEN=your-generated-token-here
```

### 3. Access Admin Panel
Open your browser:
```
http://localhost:3000/admin
```

---

## 🎨 Using the Admin Panel

### Step 1: Authenticate
1. Go to `/admin`
2. Paste your admin token in the "Authentication" section
3. Click "Unlock"

### Step 2: Fill Out the Form
- **Post Title**: The title of your blog post
- **Description**: Short description (1-2 sentences) for previews
- **Date**: Publication date (YYYY-MM-DD format)
- **Tags**: Comma-separated tags (e.g., `react, next.js, tutorial`)
- **Content**: Write your post in MDX format

### Step 3: Publish
Click "Publish Post" and your post will be saved to `content/posts/[slug].mdx`

---

## 📝 MDX Content Format

The admin panel supports full Markdown and MDX syntax:

```markdown
# Heading 1

## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

1. Numbered item
2. Another item

[Link text](https://example.com)

\`\`\`javascript
// Code blocks
const hello = "world";
\`\`\`

> Blockquotes work too

---

<CustomComponent prop="value" />
```

---

## 🔌 Using the API Directly

### Basic Request
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My Blog Post",
    "description": "This is a short description",
    "date": "2024-01-15",
    "tags": ["tag1", "tag2"],
    "content": "# My Blog Post\n\nContent here..."
  }'
```

### JavaScript/TypeScript Example
```typescript
const token = process.env.ADMIN_TOKEN;

const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: 'My Post',
    description: 'Short description',
    date: '2024-01-15',
    tags: ['tag1', 'tag2'],
    content: '# Content here...',
  }),
});

const data = await response.json();
console.log(data);
```

### Response Examples

**Success (201)**:
```json
{
  "success": true,
  "message": "Blog post saved successfully at /path/to/content/posts/my-blog-post.mdx",
  "post": {
    "slug": "my-blog-post",
    "title": "My Blog Post",
    "description": "This is a short description",
    "date": "2024-01-15",
    "tags": ["tag1", "tag2"]
  }
}
```

**Validation Error (400)**:
```json
{
  "error": "Validation failed",
  "details": [
    "Title is required and must be a non-empty string",
    "Date must be a valid ISO date string"
  ]
}
```

**Slug Exists (409)**:
```json
{
  "error": "Post with slug \"my-blog-post\" already exists"
}
```

**Unauthorized (401)**:
```json
{
  "error": "Unauthorized: Invalid or missing admin token"
}
```

---

## 🔄 API Endpoint Details

### POST /api/posts

**Authentication**: Required (Bearer token)

**Request Body**:
```typescript
{
  title: string;          // Required: Post title
  description: string;    // Required: Short description
  date: string;          // Required: ISO date (YYYY-MM-DD)
  tags?: string[];       // Optional: Array of tags
  content: string;       // Required: MDX content
}
```

**Validation Rules**:
- `title`: Non-empty string, max reasonable length
- `description`: Non-empty string, provides preview text
- `date`: Valid ISO date format (YYYY-MM-DD)
- `tags`: Array of strings (optional)
- `content`: Non-empty string with MDX content

**Response Codes**:
- `201`: Post created successfully
- `400`: Validation failed
- `401`: Unauthorized
- `409`: Slug already exists
- `500`: Server error

---

## 🛡️ Security Considerations

### Best Practices

1. **Use a Strong Token**
   ```bash
   # Generate 32-byte random token
   openssl rand -hex 32
   ```

2. **Keep Token Secret**
   - Don't commit `.env.local` to version control
   - Use `.gitignore` (already configured)
   - Store in production as environment variable

3. **In Production**
   - Use proper JWT or session authentication
   - Consider rate limiting
   - Add HTTPS requirement
   - Implement request logging

4. **File Permissions**
   - Ensure `content/posts/` is writable
   - Consider backup strategy

---

## 🔍 Troubleshooting

### Admin Token Not Working
- Verify `ADMIN_TOKEN` is set in `.env.local`
- Check token is pasted correctly
- Make sure it's in `Authorization: Bearer TOKEN` format

### "Slug Already Exists"
- Change the post title to generate a different slug
- Or delete the existing MDX file in `content/posts/`

### Post Not Appearing
1. Check post was saved: `ls content/posts/`
2. Verify frontmatter is valid YAML
3. Rebuild: `npm run build`

### API Returns 500 Error
- Check server console for detailed error
- Verify `content/posts/` directory exists
- Check file system permissions

---

## 📚 File Structure

Posts are saved as:
```
content/posts/
├── my-blog-post.mdx
├── another-post.mdx
└── tutorial.mdx
```

Each `.mdx` file contains:
```mdx
---
title: "Post Title"
description: "Short description"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---

# Your Content Here

This is your blog post content in MDX format.
```

---

## 🚀 Advanced Usage

### Custom Slug Generation
The slug is automatically generated from the title:
- Lowercased
- Special characters removed
- Spaces converted to hyphens
- Multiple hyphens collapsed

Example: `"My First React Post!"` → `my-first-react-post`

### Bulk Import
To programmatically create multiple posts:

```typescript
const posts = [
  { title: "Post 1", description: "...", date: "2024-01-01", tags: [], content: "..." },
  { title: "Post 2", description: "...", date: "2024-01-02", tags: [], content: "..." },
];

for (const post of posts) {
  await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
}
```

---

## 📖 Example Posts

See `ADMIN_PANEL_EXAMPLES.md` for complete example posts and use cases.
