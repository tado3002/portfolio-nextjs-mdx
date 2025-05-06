"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";
import { MdEditor } from "@/components/MdEditor/MdEditor";
import { BlogCoverInput } from "@/components/Input/BlogCoverInput";
import { Blog } from "@/lib/blogs";

interface Props {
  blog: Blog;
}

export default function EditBlogForm({ blog }: Props) {
  const [title, setTitle] = useState(blog.title);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    blog.category,
  );

  const [coverFile, setCoverFile] = useState<File | null>();
  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    blog.cover,
  );
  const [description, setDescription] = useState<string | undefined>(
    blog.shortDescription,
  );
  const [content, setContent] = useState<string | undefined>(blog.body);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newFilename = coverPreview!.split("uploads")[1];
    const uploadFile = async () => {
      if (coverFile && blog.cover !== coverPreview) {
        const formData = new FormData();
        formData.append("file", coverFile);
        // upload new cover
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const { filename } = await uploadRes.json();
          newFilename = filename;
        } else {
          alert("Upload cover gagal");
          return;
        }

        // delete old cover
        const deleteRes = await fetch(
          `/api/upload/${blog.cover.split("uploads/")[1]}`,
          {
            method: "DELETE",
          },
        );
        if (!deleteRes.ok) {
          alert("Delete cover lama gagal");
        }
      }
    };
    await uploadFile();

    const res = await fetch(`/api/blogs/${blog.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category: selectedCategory,
        content,
        cover: newFilename,
        description,
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Gagal menyimpan post");
    }
  };

  return (
    <main className="container mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {/*title input*/}
          <div>
            <label className="block font-medium mb-2">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary border-border focus:ring-mint text-white w-[80%] rounded-lg border p-[10px] placeholder:font-thin focus:ring-2 focus:outline-none"
              required
            />
          </div>
          <div>
            {/*category input*/}
            <label className="block font-medium mb-2">Kategory</label>
            <Dropdown
              placeholder={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
          {/*cover input*/}
          <div>
            <label className="block font-medium mb-2">Cover</label>
            <BlogCoverInput
              setCoverFile={setCoverFile}
              setCoverPreview={setCoverPreview}
              coverPreview={coverPreview}
            />
          </div>

          <div>
            {/*description input*/}
            <label className="block font-medium mb-2">Deskripsi</label>
            <textarea
              className="bg-secondary border-border focus:ring-mint text-white w-full rounded-lg border p-[10px] placeholder:font-thin focus:ring-2 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          {/*content input*/}
          <label className="block font-medium mb-2">Konten (MDX)</label>
          <div className="border rounded">
            <MdEditor content={content} setContent={setContent} />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </main>
  );
}
