import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Footer from "@/components/footer";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <header className="mb-20">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="absolute -bottom-8 right-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_4s_ease-in-out_infinite] [animation-delay:2s]"></div>

            <div className="relative">
              <div className="inline-block mb-4">
                <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
                  Available for opportunities
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Hi, I'm Rahul 👋
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Software developer crafting elegant solutions to complex
                problems. Writing about{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  engineering
                </span>
                ,
                <span className="font-semibold text-slate-900 dark:text-white">
                  {" "}
                  AI
                </span>
                , and building
                <span className="font-semibold text-slate-900 dark:text-white">
                  {" "}
                  things that matter
                </span>
                .
              </p>

              <nav
                className="flex flex-wrap gap-4 mt-8"
                aria-label="Primary actions"
              >
                <Link
                  href="mailto:rjrahool007@gmail.com"
                  className="group px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#work"
                  className="px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-all shadow-md"
                >
                  View my work
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Latest Writing */}
        <section className="mb-20" aria-labelledby="latest-writing">
          <div className="flex items-center justify-between mb-8">
            <h2
              id="latest-writing"
              className="text-3xl font-bold text-slate-900 dark:text-white"
            >
              Latest Writing
            </h2>
            <Link
              href="/blog"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium flex items-center gap-2 group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-6">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="animate-[fadeInUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative block bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <time dateTime={post.date}>{post.date}</time>
                    <span
                      className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                      aria-hidden="true"
                    ></span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {post.excerpt ||
                      `${post.title} - Read more about this topic.`}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section
          className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl"
          aria-labelledby="connect"
        >
          <h2 id="connect" className="text-3xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-slate-300 dark:text-slate-400 text-lg mb-8 max-w-2xl">
            Always open to interesting conversations about technology,
            collaboration opportunities, or just to chat about ideas.
          </p>

          <nav className="flex flex-wrap gap-4" aria-label="Social links">
            <a
              href="https://github.com/rjrahul007"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Github className="w-5 h-5" />
              GitHub
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://www.linkedin.com/in/rjrahool007"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="mailto:rjrahool007@gmail.com"
              className="group flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/20"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </nav>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
