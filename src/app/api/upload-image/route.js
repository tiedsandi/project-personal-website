import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("image");

  if (!file) {
    return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Format harus PNG, JPG, WebP, atau GIF" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimal 5MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const bytes = await file.arrayBuffer();
  const dest = path.join(process.cwd(), "public/images/demo", filename);

  await writeFile(dest, Buffer.from(bytes));
  return NextResponse.json({ ok: true, filename });
}
