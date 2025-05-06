import { NextApiRequest } from "next";
import { parse } from "cookie";
import { NextRequest } from "next/server";

export function isAuthenticated(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || "");
  return cookies.admin_auth === "admin_token";
}

export function isAdminToken(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);

  return cookies.admin_auth === "admin_token";
}
