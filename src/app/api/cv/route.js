import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("cv");

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Upload file PDF" }, { status: 400 });
  }

  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimal 15MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { error } = await supabase.storage
    .from("cv")
    .upload("cv.pdf", buffer, { contentType: "application/pdf", upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from("cv").getPublicUrl("cv.pdf");
  return NextResponse.json({ ok: true, message: "CV berhasil diupload", url: urlData.publicUrl });
}
