import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDir = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  return fs.readdirSync(postsDir).map((slug) => {
    const file = fs.readFileSync(path.join(postsDir, slug));
    const { data, content } = matter(file);
    return {
      slug: slug.replace(".mdx", ""),
      ...data,
      readingTime: readingTime(content).text,
    };
  });
}

export function getPost(slug: string) {
  const file = fs.readFileSync(path.join(postsDir, slug + ".mdx"));
  return matter(file);
}
