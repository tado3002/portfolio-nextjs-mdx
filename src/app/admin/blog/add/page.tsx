"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";
import { MdEditor } from "@/components/MdEditor/MdEditor";
import { BlogCoverInput } from "@/components/Input/BlogCoverInput";

export default function Page() {
  const [title, setTitle] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | undefined>();
  const [coverFile, setCoverFile] = useState<File | null>();
  const [description, setDescription] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>(
    "## Tulis konten MDX di sini...",
  );
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let coverFilename = "";
    if (coverFile) {
      const formData = new FormData();
      formData.append("file", coverFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const { filename } = await uploadRes.json();
        coverFilename = filename;
      } else {
        alert("Upload cover gagal");
        return;
      }
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category: selectedCategory,
        content,
        coverFile: coverFilename,
        description,
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Gagal menyimpan post");
    }
    console.log(
      JSON.stringify({
        title,
        selectedCategory,
        description,
        content,
        coverFilename,
      }),
    );
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
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
            <Dropdown onChange={setSelectedCategory} />
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
