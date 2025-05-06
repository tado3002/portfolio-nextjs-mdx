import BlogCard from "@/components/Blog/MinimalCard";
import CategoryList from "@/components/Categories/CategoryList";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getBlogs, getCategories } from "@/services/blogs";

export default async function Home() {
  const posts = await getBlogs();
  const categories = await getCategories();

  return (
    <>
      <main className="w-dvw">
        <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
          <SectionHeading title="// Categories" />
          <CategoryList categories={categories} />
          <section className="my-16">
            <SectionHeading
              title={"// Popular Articles"}
              subtitle="Diverse Range of articles related to Artificial Intelligence"
            />
            <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((blog) => (
                <BlogCard key={blog.slug} post={blog} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
