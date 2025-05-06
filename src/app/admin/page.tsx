import { TableBlog } from "@/components/Table/TableBlog";
import { getBlogs } from "@/services/blogs";
import Link from "next/link";

export default async function AdminDashboard() {
  const blogs = await getBlogs();

  return (
    <main className="p-8 py-16 container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6">CMS Blog Admin</h1>
        <Link
          href="/admin/blog/add"
          className="bg-mint text-secondary font-semibold hover:bg-mint/90 px-4 py-2 rounded"
        >
          + Buat Post Baru
        </Link>
      </div>
      {blogs.length > 0 ? (
        <TableBlog blogs={blogs} />
      ) : (
        <h1 className="flex mt-6 text-xl font-medium justify-center">
          Belum ada blog yang ditambahkan!
        </h1>
      )}
    </main>
  );
}
