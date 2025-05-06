import { promises as fs } from "fs";
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

export async function getCategories(): Promise<BlogCategory[]> {
  return blogCategories;
}

export async function getSlugBlogs() {
  return await getBlogs().then((blogs) => blogs.map((post) => post.slug));
}

type BlogCategory = {
  imageSrc: string;
  altText: string;
  categoryName: string;
};

// Blog Categories
const blogCategories = [
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/09/02/22/10/dolphin-2708695_1280.png",
    altText: "JavaScript logo",
    categoryName: "Sea Food",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/05/16/09/15/tea-8765473_1280.png",
    altText: "TypeScript logo",
    categoryName: "Cutlery",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/05/31/11/28/the-cup-2360104_1280.png",
    altText: "TypeScript logo",
    categoryName: "Tea",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/07/29/18/42/wooden-box-2552370_1280.png",
    altText: "JavaScript logo",
    categoryName: "Treasure Box",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/09/17/02/02/png-2757379_1280.png",
    altText: "JavaScript logo",
    categoryName: "Vehicles",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2016/02/23/17/44/apple-1218166_1280.png",
    altText: "TypeScript logo",
    categoryName: "Fruits",
  },
];
