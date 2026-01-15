import { NextRequest, NextResponse } from "next/server";
import {
  generateSlug,
  formatBlogPost,
  saveBlogPost,
  validateBlogPost,
} from "@/lib/blog-utils";

/**
 * Commit post to GitHub repository
 * Automatically creates a commit with the new post
 */
async function commitToGitHub(
  slug: string,
  content: string,
  title: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubRepo) {
      console.warn(
        "⚠️  GitHub credentials not configured. Post saved locally but not committed."
      );
      return { success: false, error: "GitHub credentials not configured" };
    }

    const [owner, repo] = githubRepo.split("/");
    const filePath = `content/posts/${slug}.mdx`;

    // Get the current file SHA if it exists (for updates)
    let sha: string | undefined;
    try {
      const existingFile = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (existingFile.ok) {
        const data = await existingFile.json();
        sha = data.sha;
      }
    } catch {
      // File doesn't exist yet, which is fine
    }

    // Commit the file to GitHub
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add blog post: ${title}`,
          content: Buffer.from(content).toString("base64"),
          branch: "main",
          ...(sha && { sha }),
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("GitHub commit error:", error);
      return {
        success: false,
        error: error.message || "Failed to commit to GitHub",
      };
    }

    console.log(`✅ Post committed to GitHub: ${filePath}`);
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error committing to GitHub:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Authenticate admin requests
 * In production, use proper JWT or session authentication
 */
function authenticateAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const adminToken = process.env.ADMIN_TOKEN;

  if (!authHeader) {
    return false;
  }

  // Support "Bearer TOKEN" format
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return token === adminToken;
}

/**
 * POST /api/posts
 * Create a new blog post
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing admin token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate post data
    const validation = validateBlogPost(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = generateSlug(body.title);

    // Format MDX content
    const mdxContent = formatBlogPost({
      title: body.title,
      description: body.description,
      date: body.date,
      tags: body.tags || [],
      content: body.content,
    });

    // Save file
    const result = saveBlogPost(slug, mdxContent);

    if (!result.success) {
      // Return appropriate status code based on error type
      const statusCode = result.error === "SLUG_EXISTS" ? 409 : 500;
      return NextResponse.json(
        { error: result.message },
        { status: statusCode }
      );
    }

    // Attempt to commit to GitHub (doesn't block if fails)
    const gitCommit = await commitToGitHub(slug, mdxContent, body.title);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        post: {
          slug,
          title: body.title,
          description: body.description,
          date: body.date,
          tags: body.tags,
        },
        git: gitCommit.success
          ? { committed: true, message: "Post committed to GitHub" }
          : {
              committed: false,
              warning: gitCommit.error || "GitHub commit failed",
            },
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("❌ Error creating blog post:", errorMessage);

    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/posts
 * Returns API documentation
 */
export async function GET() {
  return NextResponse.json({
    message: "Blog Posts API",
    endpoints: {
      POST: {
        url: "/api/posts",
        description: "Create a new blog post",
        auth: "Required: Bearer token in Authorization header",
        body: {
          title: "string (required)",
          description: "string (required)",
          date: "string (ISO date, required)",
          tags: "string[] (optional)",
          content: "string (MDX content, required)",
        },
        example: {
          title: "My First Post",
          description: "This is my first blog post",
          date: "2024-01-15",
          tags: ["tutorial", "next.js"],
          content: "# My First Post\n\nThis is the content in MDX format.",
        },
      },
    },
  });
}
