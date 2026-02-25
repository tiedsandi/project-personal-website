import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import sharp from "sharp";

const TARGET_SIZE = 3 * 1024 * 1024; // 3MB

async function compressPhoto(buffer) {
  let quality = 80;
  let result = await sharp(buffer).webp({ quality }).toBuffer();

  while (result.length > TARGET_SIZE && quality > 20) {
    quality -= 10;
    result = await sharp(buffer).webp({ quality }).toBuffer();
  }

  return result;
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("photo");

  if (!file) return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Format harus JPG, PNG, atau WebP" }, { status: 400 });
  }

  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimal 15MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const compressed = await compressPhoto(Buffer.from(bytes));

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload("profile.webp", compressed, { contentType: "image/webp", upsert: true });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from("images").getPublicUrl("profile.webp");
  const photoUrl = `${urlData.publicUrl}?t=${Date.now()}`;

  const { error: updateError } = await supabase.from("hero").update({ photo: photoUrl }).eq("id", 1);
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ ok: true, photo: photoUrl });
}
