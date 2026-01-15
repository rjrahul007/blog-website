"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

interface FormData {
  title: string;
  description: string;
  date: string;
  tags: string;
  content: string;
}

interface SubmitState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  details?: string[];
}

export default function AdminPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    tags: "",
    content: "",
  });

  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const [adminToken, setAdminToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [tokenError, setTokenError] = useState("");

  const handleUnlock = async () => {
    if (!adminToken.trim()) {
      setTokenError("Please enter a token");
      return;
    }

    try {
      setTokenError("");
      setSubmitState({
        status: "loading",
        message: "Validating token...",
      });

      // Test the token with a simple GET request to /api/posts
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setSubmitState({
        status: "idle",
        message: "",
      });

      if (response.status === 401) {
        setTokenError("Invalid token - authentication failed");
        return;
      }

      // Token is valid, unlock the form
      setShowTokenInput(false);
      setTokenError("");
    } catch (error) {
      setSubmitState({
        status: "idle",
        message: "",
      });
      setTokenError("Error validating token");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminToken) {
      setSubmitState({
        status: "error",
        message: "Admin token is required",
      });
      return;
    }

    setSubmitState({
      status: "loading",
      message: "Creating blog post...",
    });

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          tags: tagsArray,
          content: formData.content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message: data.error || "Failed to create blog post",
          details: data.details,
        });
        return;
      }

      // Success
      setSubmitState({
        status: "success",
        message: `✓ Blog post "${formData.title}" created successfully!`,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        tags: "",
        content: "",
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setSubmitState({
          status: "idle",
          message: "",
        });
      }, 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setSubmitState({
        status: "error",
        message: "Failed to submit form",
        details: [errorMessage],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create and publish new blog posts
          </p>
        </div>

        {/* Token Input */}
        {showTokenInput && (
          <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Authentication
            </h2>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Enter admin token (example007)"
                value={adminToken}
                onChange={(e) => {
                  setAdminToken(e.target.value);
                  setTokenError("");
                }}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
              />
              <button
                onClick={handleUnlock}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Unlock
              </button>
            </div>
            {tokenError && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                {tokenError}
              </p>
            )}
            {!tokenError && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Use &quot;example007&quot; as the admin token
              </p>
            )}
          </div>
        )}

        {/* Status Messages */}
        {submitState.status === "error" && (
          <div className="mb-8 p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">
                {submitState.message}
              </p>
              {submitState.details && (
                <ul className="mt-2 text-sm text-red-800 dark:text-red-300 space-y-1">
                  {submitState.details.map((detail, i) => (
                    <li key={i}>• {detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {submitState.status === "success" && (
          <div className="mb-8 p-4 border border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="font-semibold text-green-900 dark:text-green-200">
              {submitState.message}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
        >
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Short description for previews (one or two sentences)"
              rows={2}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
              required
            />
          </div>

          {/* Date and Tags Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g. react, next.js, tutorial"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
              />
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
            >
              Content (MDX Format)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="# Heading

Your MDX content here...

- Use markdown syntax
- You can also use React components"
              rows={12}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 font-mono text-sm"
              required
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Use standard Markdown or MDX syntax
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitState.status === "loading"}
            className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitState.status === "loading" && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            {submitState.status === "loading"
              ? "Publishing..."
              : "Publish Post"}
          </button>
        </form>

        {/* API Documentation */}
        <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            API Documentation
          </h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">
                Endpoint:
              </span>{" "}
              POST /api/posts
            </p>
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">
                Authentication:
              </span>{" "}
              Bearer token in Authorization header
            </p>
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">
                Environment Variable:
              </span>{" "}
              ADMIN_TOKEN
            </p>
            <details className="cursor-pointer">
              <summary className="font-semibold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300">
                Example Request
              </summary>
              <pre className="mt-2 p-3 bg-slate-900 dark:bg-slate-950 text-slate-100 rounded text-xs overflow-x-auto">
                {`curl -X POST http://localhost:3000/api/posts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "title": "My First Post",
    "description": "This is my first blog post",
    "date": "2024-01-15",
    "tags": ["tutorial", "next.js"],
    "content": "# My First Post\\n\\nContent here..."
  }'`}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
