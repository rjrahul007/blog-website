"use client";
import { useState } from "react";
import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { Search as SearchIcon, X } from "lucide-react";

interface SearchProps {
  posts: PostMeta[];
  onClose?: () => void;
}

export function Search({ posts, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = query
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      )
    : [];

  const handleSelect = () => {
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 w-5 h-5 text-slate-400 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(!!e.target.value);
          }}
          onFocus={() => setIsOpen(!!query)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={handleSelect}
              className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border-b border-slate-200 dark:border-slate-700 last:border-b-0"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-50 p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          No posts found matching "{query}"
        </div>
      )}
    </div>
  );
}
