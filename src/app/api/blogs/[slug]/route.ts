import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { parse } from "cookie";
import { getBlog, getBlogs } from "@/services/blogs";

function isAdminRequest(req: NextRequest): boolean {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  return cookies.admin_auth === "admin_token";
}

// GET
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  if (!blog) return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(blog);
}

// PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();
  const { title, content, category, cover, description } = body;

  if (!title || !content || !category || !description || !cover) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const blogDir = path.join(process.cwd(), "content/blogs");
  const filePath = path.join(blogDir, `${slug}.mdx`);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const newSlug = await slugify(title);
  const newPath = path.join(blogDir, `${newSlug}.mdx`);

  const frontmatter = `---
title: "${title}"
slug: "${newSlug}"
category: "${category}"
cover: "${process.env.NEXT_PUBLIC_SITE_URL + "/uploads/" + cover}"
shortDescription: "${description}"
publishedDate: "${new Date().toISOString()}"
---
${content}
`;

  if (newSlug !== slug) {
    await writeFile(newPath, frontmatter);
    await unlink(filePath);
  } else await writeFile(filePath, frontmatter);

  return NextResponse.json({ message: "Post updated", slug: newSlug });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await unlink(`content/blogs/${slug}.mdx`);

  return NextResponse.json({ message: "Post deleted" });
}

async function slugify(text: string) {
  const generatedSlug = text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let exist = 0;
  await getBlogs().then((blogs) =>
    blogs!.forEach((blog) => {
      if (blog.title === text) {
        exist++;
      }
    }),
  );

  return exist ? `${generatedSlug}-${exist++}` : generatedSlug;
}
