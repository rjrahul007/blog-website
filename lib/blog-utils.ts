// import fs from "fs";
// import path from "path";

/**
 * Convert a title to a URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Format blog post data into MDX frontmatter + content
 */
export function formatBlogPost(data: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}): string {
  const frontmatter = `---
title: "${data.title}"
description: "${data.description}"
date: "${data.date}"
tags: ${JSON.stringify(data.tags)}
---

`;
  return frontmatter + data.content;
}

/**
 * Save blog post as MDX file
 */
// export function saveBlogPost(
//   slug: string,
//   content: string
// ): {
//   success: boolean;
//   message: string;
//   filepath?: string;
//   error?: string;
// } {
//   try {
//     const postsDir = path.join(process.cwd(), "content", "posts");

//     // Create directory if it doesn't exist
//     if (!fs.existsSync(postsDir)) {
//       fs.mkdirSync(postsDir, { recursive: true });
//     }

//     const filepath = path.join(postsDir, `${slug}.mdx`);

//     // Check if file already exists
//     if (fs.existsSync(filepath)) {
//       return {
//         success: false,
//         message: `Post with slug "${slug}" already exists`,
//         error: "SLUG_EXISTS",
//       };
//     }

//     // Write file
//     fs.writeFileSync(filepath, content, "utf8");

//     return {
//       success: true,
//       message: `Blog post saved successfully at ${filepath}`,
//       filepath,
//     };
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return {
//       success: false,
//       message: `Failed to save blog post: ${errorMessage}`,
//       error: errorMessage,
//     };
//   }
// }

/**
 * Validate blog post data
 */
export function validateBlogPost(data: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return {
      valid: false,
      errors: ["Post data must be an object"],
    };
  }

  const post = data as Record<string, unknown>;

  if (!post.title || typeof post.title !== "string" || !post.title.trim()) {
    errors.push("Title is required and must be a non-empty string");
  }

  if (
    !post.description ||
    typeof post.description !== "string" ||
    !post.description.trim()
  ) {
    errors.push("Description is required and must be a non-empty string");
  }

  if (!post.date || typeof post.date !== "string" || !post.date.trim()) {
    errors.push("Date is required and must be a valid ISO date string");
  } else {
    // Validate ISO date format
    if (Number.isNaN(Date.parse(post.date))) {
      errors.push("Date must be a valid ISO date string (YYYY-MM-DD)");
    }
  }

  if (!Array.isArray(post.tags)) {
    errors.push("Tags must be an array");
  } else if (post.tags.some((tag) => typeof tag !== "string")) {
    errors.push("All tags must be strings");
  }

  if (
    !post.content ||
    typeof post.content !== "string" ||
    !post.content.trim()
  ) {
    errors.push("Content is required and must be a non-empty string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
