import EditBlogForm from "@/components/Form/EditBlogForm";
import { Blog, getBlog } from "@/services/blogs";

interface Props {
  params: { slug: string };
}

export default async function EditPage({ params }: Props) {
  const { slug } = await params;
  const blog: Blog | undefined = await getBlog(slug);
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <EditBlogForm blog={blog!} />
    </main>
  );
}
