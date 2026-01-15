/**
 * Centralized configuration for the blog
 * All environment variables should be accessed through this file
 */

export const SITE_CONFIG = {
  // Site URLs and naming
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Sam | Blog",
  siteDescription: "Thoughts on software, AI, and engineering",
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Rahul",
  email: process.env.NEXT_PUBLIC_EMAIL || "rjrahool007@gmail.com",

  // Social Links
  socialLinks: {
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/rjrahul007",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/in/rjrahul007",
    twitter:
      process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/rjrahul007",
  },

  // Giscus Comments Configuration
  giscus: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "rjrahul007/blog-website",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "R_kgDOQ5NwtA",
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Blog Comments",
    categoryId:
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "DIC_kwDOQ5NwtM4C09R0",
  },
} as const;

/**
 * Validate that critical config values are set
 */
export function validateConfig() {
  if (
    process.env.NODE_ENV === "production" &&
    SITE_CONFIG.siteUrl === "http://localhost:3000"
  ) {
    console.warn("⚠️  NEXT_PUBLIC_SITE_URL is not set for production");
  }
}
