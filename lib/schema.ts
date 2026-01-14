// lib/posts/schema.ts
import { z } from "zod";

/**
 * Frontmatter schema for blog posts.
 * This is validated at build time.
 */
export const PostSchema = z.object({
  title: z.string().min(1, "Post title is required"),
  description: z.string().min(1, "Post description is required"),
  date: z
    .string()
    .refine(
      (val) => !Number.isNaN(Date.parse(val)),
      "Date must be a valid ISO date string"
    ),
  tags: z.array(z.string()).default([]),
});

/**
 * Inferred TypeScript type
 */
export type PostFrontmatter = z.infer<typeof PostSchema>;
