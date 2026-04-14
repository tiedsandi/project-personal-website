import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 jam
    path: "/",
  });

  return response;
}
