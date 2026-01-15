import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Giscus from "@/components/giscus";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ShareButton from "@/components/share-button";
import { generateBlogPostSchema } from "@/lib/metadata";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = `${SITE_CONFIG.siteUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: SITE_CONFIG.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [SITE_CONFIG.author],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const schema = generateBlogPostSchema({
    title: post.title,
    description: post.description,
    slug,
    date: post.date,
    readingTime: post.readingTime,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Back Navigation */}
          <nav className="mb-12" aria-label="Breadcrumb">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to blog
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-12 animate-[fadeInUp_0.6s_ease-out_both]">
            <div className="relative mb-8">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />

              <div className="relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300 mb-6">
              <time dateTime={post.date} className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </time>

              <span
                className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                aria-hidden="true"
              />

              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </span>
            </div>
            <ShareButton title={post.title} />
          </header>

          {/* Article Content */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm animate-[fadeInUp_0.6s_ease-out_both] [animation-delay:0.1s]">
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </article>

          {/* Comments Section */}
          <section
            className="mt-16 animate-[fadeInUp_0.6s_ease-out_both] [animation-delay:0.2s]"
            aria-labelledby="comments-heading"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h2
                id="comments-heading"
                className="text-2xl font-bold text-slate-900 dark:text-white mb-6"
              >
                Comments
              </h2>
              <Giscus />
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Read more articles
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}
