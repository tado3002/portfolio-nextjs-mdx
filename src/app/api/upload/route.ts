import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { mkdirSync, existsSync } from "fs";
import { isAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isAdminToken(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const filename = `${uuid()}${ext}`;

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ filename });
}
