import { getBlogs } from "@/lib/blogs";
import { NextResponse, NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { isAdminToken } from "@/lib/auth";

// GET
export async function GET() {
  const blogs = await getBlogs();
  return NextResponse.json({ data: blogs });
}

// POST
export async function POST(req: NextRequest) {
  if (!isAdminToken(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, category, coverFile, description } = body;

  if (!title || !content || !category || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const slug = await slugify(title);

  const blogDir = path.join(process.cwd(), "content/blogs");

  if (!existsSync(blogDir)) {
    await mkdir(blogDir, { recursive: true });
  }

  const filePath = path.join(blogDir, `${slug}.mdx`);
  const frontmatter = `---
title: "${title}"
slug: "${slug}"
category: "${category}"
cover: "${process.env.NEXT_PUBLIC_SITE_URL + "/uploads/" + coverFile}"
shortDescription: "${description}"
publishedDate: "${new Date().toISOString()}"
---
${content}
`;

  await writeFile(filePath, frontmatter);

  return NextResponse.json({ message: "Post created", slug });
}

async function slugify(text: string) {
  const generatedSlug = text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let exist = 0;
  await getBlogs().then((blogs) =>
    blogs.forEach((blog) => {
      if (blog.title === text) {
        exist++;
      }
    }),
  );

  return exist ? `${generatedSlug}-${exist}` : generatedSlug;
}
