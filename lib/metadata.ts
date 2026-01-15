/**
 * SEO and metadata utilities
 */

import { SITE_CONFIG } from "./config";

/**
 * Generate JSON-LD schema for blog posts
 */
export function generateBlogPostSchema({
  title,
  description,
  slug,
  date,
  readingTime,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  readingTime: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: `${SITE_CONFIG.siteUrl}/og?title=${encodeURIComponent(title)}`,
    datePublished: new Date(date).toISOString(),
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.siteUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.siteUrl}/blog/${slug}`,
    },
  };
}

/**
 * Generate JSON-LD schema for the website
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    url: SITE_CONFIG.siteUrl,
    name: SITE_CONFIG.siteName,
    description: SITE_CONFIG.siteDescription,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
  };
}

/**
 * Generate JSON-LD schema for Person (author)
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author,
    url: SITE_CONFIG.siteUrl,
    email: SITE_CONFIG.email,
    sameAs: [
      SITE_CONFIG.socialLinks.github,
      SITE_CONFIG.socialLinks.linkedin,
      SITE_CONFIG.socialLinks.twitter,
    ],
  };
}
