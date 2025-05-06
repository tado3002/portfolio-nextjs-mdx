"use client";
import { Blog } from "@/services/blogs";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  blogs: Blog[];
}

export const TableBlog = ({ blogs }: Props) => {
  const router = useRouter();
  const deleteBlogHandler = (blog: Blog) => {
    const deleteBlog = async () => {
      const res = await fetch(`/api/blogs/${blog.slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const fileName = blog.cover.split("uploads/")[1];
        await fetch(`/api/upload/${fileName}`, {
          method: "DELETE",
        });
        alert(`berhasil menghapus blog ${fileName}\nimage `);
        router.refresh();
      } else {
        alert(`gagal menghapus blog ${blog.slug}`);
      }
    };
    deleteBlog();
  };
  return (
    <div>
      <table className="w-full border border-neutral">
        <thead>
          <tr className="bg-secondary">
            <th className="text-left p-2">Cover</th>
            <th className="text-left p-2">Judul</th>
            <th className="text-left p-2">Tanggal</th>
            <th className="text-left p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((post) => (
            <tr key={post.slug} className="border-t border-neutral">
              <td className="p-2">
                <div className="flex flex-col gap-0">
                  <figure className="relative h-20 w-full overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill={true}
                      sizes="100%"
                      className="rounded-lg object-cover"
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                    />
                  </figure>
                </div>
              </td>

              <td className="p-2">
                <div className="flex flex-col gap-0">
                  <h4>{post.title}</h4>
                  <p className="text-neutral text-sm">
                    {post.shortDescription}
                  </p>
                </div>
              </td>
              <td className="p-2">{formatDate(post.publishedDate)}</td>
              <td className="p-2 space-x-2">
                <Link
                  href={`/admin/blog/edit/${post.slug}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
                <button
                  className="text-red-600 underline"
                  onClick={() => deleteBlogHandler(post)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
