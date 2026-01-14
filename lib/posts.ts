import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";
import { PostSchema } from "./schema";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

/**
 * Get metadata for all posts (no MDX rendering).
 * Used for blog index, homepage, sitemap, etc.
 */
export const getAllPosts = cache((): PostMeta[] => {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");

      const { data, content } = matter(raw);
      const frontmatter = PostSchema.parse(data);

      return {
        slug,
        ...frontmatter,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
});

/**
 * Get a single post (metadata + raw MDX content).
 * Used by the blog post page.
 */
export const getPostBySlug = cache((slug: string) => {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    ...PostSchema.parse(data),
    readingTime: readingTime(content).text,
  };
});
