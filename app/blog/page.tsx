// import Link from "next/link";
// import { getAllPosts } from "@/lib/posts";

// export default function BlogPage() {
//   const posts = getAllPosts();

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Blog</h1>
//       {posts.map((post) => (
//         <Link key={post.slug} href={`/blog/${post.slug}`}>
//           <div className="mb-4 p-4 border rounded-xl hover:bg-muted">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-sm text-gray-500">
//               {post.date} · {post.readingTime}
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Calendar, Clock, ArrowLeft, Search } from "lucide-react";
import Footer from "@/components/footer";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[pulse_4s_ease-in-out_infinite]" />

            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Blog
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
                Thoughts on engineering, AI, and building products that matter.
                <span className="font-semibold text-slate-900 dark:text-white">
                  {" "}
                  {posts.length} articles
                </span>{" "}
                and counting.
              </p>
            </div>
          </div>
        </header>

        {/* Posts Grid */}
        <section aria-label="Blog posts">
          <div className="grid gap-6">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="animate-[fadeInUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <time
                      dateTime={post.date}
                      className="flex items-center gap-1.5"
                    >
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </time>

                    <span
                      className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                      aria-hidden="true"
                    />

                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                  </div>

                  <div className="mt-4 text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article →
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No posts yet
              </h3>

              <p className="text-slate-600 dark:text-slate-400">
                Check back soon for new content!
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
