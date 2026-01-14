"use client";
import { useState } from "react";

export function Search({ posts }: any) {
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mb-6">
      <input
        className="w-full border p-2 rounded"
        placeholder="Search posts"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((p) => (
        <div key={p.slug}>{p.title}</div>
      ))}
    </div>
  );
}
