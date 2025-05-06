import { isAdminToken } from "@/lib/auth";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ uuid: string }>;
  },
) {
  if (!isAdminToken(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { uuid } = await params;
  try {
    await unlink(`public/uploads/${uuid}`);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
  return NextResponse.json({ message: `success to delete ${uuid}` });
}
