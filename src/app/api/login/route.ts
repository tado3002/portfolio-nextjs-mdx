import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPasswordHash = process.env.ADMIN_PASSWORD!;

  const isValid = email === adminEmail && password === adminPasswordHash;

  if (!isValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  // Set cookie auth manually
  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("admin_auth", "admin_token", {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return res;
}
