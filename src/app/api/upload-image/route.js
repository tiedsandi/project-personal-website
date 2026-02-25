import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import sharp from "sharp";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const TARGET_SIZE = 3 * 1024 * 1024; // 3MB

async function compressImage(buffer, mimeType) {
  // GIF tidak dikompresi (animasi akan hilang)
  if (mimeType === "image/gif") {
    return { buffer, ext: "gif", contentType: "image/gif" };
  }

  // Coba quality 80 dulu
  let quality = 80;
  let result = await sharp(buffer).webp({ quality }).toBuffer();

  // Kurangi quality sampai < 3MB
  while (result.length > TARGET_SIZE && quality > 20) {
    quality -= 10;
    result = await sharp(buffer).webp({ quality }).toBuffer();
  }

  return { buffer: result, ext: "webp", contentType: "image/webp" };
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("image");

  if (!file) {
    return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Format harus PNG, JPG, WebP, atau GIF" }, { status: 400 });
  }

  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimal 15MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const { buffer, ext, contentType } = await compressImage(Buffer.from(bytes), file.type);

  const baseName = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const filename = `${baseName}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filename, buffer, { contentType, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(filename);
  return NextResponse.json({ ok: true, filename: urlData.publicUrl });
}
