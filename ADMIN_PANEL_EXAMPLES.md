# Admin Panel Examples

## Example 1: Basic Post

**Title**: Getting Started with Next.js 14

**Description**: Learn the fundamentals of Next.js 14 and how to build your first web application

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

That's it! You now have a Next.js application running.

## Key Features

1. **App Router**: Modern file-based routing
2. **Server Components**: Run code on the server
3. **API Routes**: Built-in backend
4. **Image Optimization**: Automatic image handling
5. **CSS Modules**: Scoped styling

## Next Steps

- Learn about Server Components
- Explore the API routes
- Build a full-stack application
```

---

## Example 2: Technical Deep Dive

**Title**: Understanding React Server Components

**Description**: Deep dive into how React Server Components work and when to use them

**Date**: 2024-01-14

**Tags**: react, server-components, performance

**Content**:
```markdown
# Understanding React Server Components

React Server Components (RSCs) are a paradigm shift in how we build React applications.

## What are Server Components?

Server Components run **exclusively on the server**. They:
- Never send JavaScript to the client
- Can access databases directly
- Can use secrets securely
- Are perfect for data fetching

## Server vs Client Components

| Aspect | Server | Client |
|--------|--------|--------|
| Backend Access | ✅ Yes | ❌ No |
| Secrets | ✅ Safe | ❌ Exposed |
| State | ❌ No | ✅ Yes |
| Hooks | ❌ No | ✅ Yes |
| Interactivity | ❌ No | ✅ Yes |

## Example Server Component

```typescript
// app/posts/page.tsx
import { getPosts } from '@/lib/db';

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

Notice:
- No "use client" directive
- Direct database access
- Async/await syntax
- No hydration needed

## Mixing Server and Client

```typescript
// Server Component
import { ClientButton } from './client-button';

export default function Page() {
  return (
    <div>
      <p>Server data here</p>
      <ClientButton /> {/* Client Component */}
    </div>
  );
}
```

```typescript
// Client Component
'use client';

import { useState } from 'react';

export function ClientButton() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
```

## Performance Benefits

1. **Smaller JavaScript**: No component code sent to client
2. **Better SEO**: All content on server
3. **Faster Rendering**: Server can render faster
4. **Direct DB Access**: No API call round trips

## When to Use What

**Use Server Components for:**
- Data fetching
- Accessing secrets
- Heavy computations
- Static content

**Use Client Components for:**
- User interactions
- React hooks (useState, useEffect)
- Event listeners
- Browser APIs

## Summary

Server Components are powerful but aren't a replacement for Client Components. Use them together for optimal performance.
```

---

## Example 3: Mini Tutorial

**Title**: Build a To-Do App with React Hooks

**Description**: Step-by-step guide to building an interactive to-do application with React

**Date**: 2024-01-13

**Tags**: react, hooks, tutorial, beginner

**Content**:
```markdown
# Build a To-Do App with React Hooks

In this tutorial, we'll build a functional to-do app using React hooks.

## Final Result

You'll build an app where you can:
- Add new to-dos
- Mark to-dos as complete
- Delete to-dos
- Filter by status

## Step 1: Set Up the Component

```typescript
import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  return (
    <div className="todo-app">
      <h1>My To-Dos</h1>
    </div>
  );
}
```

## Step 2: Add Input Field

```typescript
function handleAddTodo() {
  if (!input.trim()) return;
  
  const newTodo = {
    id: Date.now(),
    text: input,
    completed: false,
  };
  
  setTodos([...todos, newTodo]);
  setInput('');
}

return (
  <div className="todo-app">
    <h1>My To-Dos</h1>
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
      placeholder="Add a new to-do..."
    />
    <button onClick={handleAddTodo}>Add</button>
  </div>
);
```

## Step 3: Display To-Dos

```typescript
return (
  <div className="todo-app">
    {/* ... input field ... */}
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
```

## Step 4: Add Delete Functionality

```typescript
function handleDelete(id) {
  setTodos(todos.filter(todo => todo.id !== id));
}

// In the render:
<button onClick={() => handleDelete(todo.id)}>
  Delete
</button>
```

## Complete Component

See the full working example above with all features!

## Styling Tips

- Use `className` for CSS modules
- Apply `text-decoration: line-through` for completed items
- Add transitions for smooth interactions
- Consider using Tailwind CSS for quick styling

## Next Steps

- Add localStorage to persist to-dos
- Add categories/projects
- Deploy to Vercel
```

---

## Example 4: Code Snippet Post

**Title**: 5 Useful Array Methods You Should Know

**Description**: Learn five powerful JavaScript array methods that will improve your code

**Date**: 2024-01-12

**Tags**: javascript, arrays, tips

**Content**:
```markdown
# 5 Useful Array Methods You Should Know

Here are five array methods that can make your JavaScript code cleaner and more efficient.

## 1. Array.prototype.map()

Transform each element in an array:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

Use case: Transform data for rendering in React

## 2. Array.prototype.filter()

Create a new array with elements that pass a condition:

```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 },
];

const adults = users.filter(u => u.age >= 18);
console.log(adults.length); // 2
```

## 3. Array.prototype.reduce()

Reduce an array to a single value:

```javascript
const prices = [10, 20, 30, 40];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 100
```

Use case: Calculate totals, group data, flatten arrays

## 4. Array.prototype.find()

Find the first element that matches a condition:

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const user = users.find(u => u.id === 2);
console.log(user.name); // 'Bob'
```

## 5. Array.prototype.some() and every()

Check if elements match a condition:

```javascript
const scores = [85, 92, 78, 95];

// At least one >= 90?
const hasHigh = scores.some(s => s >= 90);
console.log(hasHigh); // true

// All >= 70?
const allPassing = scores.every(s => s >= 70);
console.log(allPassing); // true
```

---

## Bonus: Chaining Methods

Combine methods for powerful transformations:

```javascript
const data = [1, 2, 3, 4, 5];
const result = data
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);

console.log(result); // 24
// Step by step:
// [1,2,3,4,5] -> filter -> [3,4,5]
// [3,4,5] -> map -> [6,8,10]
// [6,8,10] -> reduce -> 24
```

Happy coding! 🚀
```

---

## How to Submit These Examples

Use the admin panel to create each post:

1. Go to `/admin`
2. Unlock with your admin token
3. Copy the content above into each field
4. Click "Publish Post"

Or use the API directly:

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Getting Started with Next.js 14",
    "description": "Learn the fundamentals of Next.js 14 and how to build your first web application",
    "date": "2024-01-15",
    "tags": ["next.js", "react", "tutorial"],
    "content": "..."
  }'
```

All posts will automatically appear on your blog!
