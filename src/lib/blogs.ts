import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

export type Blog = {
  title: string;
  shortDescription: string;
  publishedDate: string;
  slug: string;
  category: string;
  cover: string;
  body: string;
};

export async function getBlogs(): Promise<Blog[]> {
  const dirPath = "content/blogs";
  try {
    await fs.stat(dirPath);
    const posts = await fs.readdir("./content/blogs/");
    return Promise.all(
      posts
        .filter((file) => path.extname(file) === ".mdx")
        .map(async (file) => {
          const filePath = `./content/blogs/${file}`;
          const fileContent = await fs.readFile(filePath, "utf8");
          const { data, content } = matter(fileContent);

          return { ...data, body: content } as Blog;
        }),
    );
  } catch (error: NodeJS.ErrnoException) {
    if (error.code === "ENOENT") {
      await fs.mkdir("content/blog", { recursive: true });
      return [];
    } else {
      console.log(error);
    }
  }
}

export async function getBlog(slug: string) {
  const posts = await getBlogs();
  return posts.find((post) => post.slug === slug);
}

export async function getCategories() {
  const posts = await getBlogs();
  return posts.map((post) => post.category);
}
