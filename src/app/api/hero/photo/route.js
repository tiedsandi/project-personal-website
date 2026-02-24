import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/hero.json");

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("photo");

  if (!file) return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Format harus JPG, PNG, atau WebP" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimal 5MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const dest = path.join(process.cwd(), "public/profile.jpg");
  await writeFile(dest, Buffer.from(bytes));

  // Update hero.json photo path
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  data.photo = `/profile.jpg?t=${Date.now()}`;
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({ ok: true, photo: data.photo });
}
