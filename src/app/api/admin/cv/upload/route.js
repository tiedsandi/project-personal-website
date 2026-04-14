import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function isAuthorized(request) {
  return request.cookies.get("admin_token")?.value === "authenticated";
}

export async function POST(request) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `cv-${Date.now()}.pdf`;

  // Delete old CV files first
  const { data: oldFiles } = await supabase.storage.from("pf-cv").list();
  if (oldFiles?.length) {
    await supabase.storage.from("pf-cv").remove(oldFiles.map((f) => f.name));
  }

  const { error: uploadError } = await supabase.storage
    .from("pf-cv")
    .upload(fileName, buffer, { contentType: "application/pdf", upsert: true });

  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: urlData } = supabase.storage
    .from("pf-cv")
    .getPublicUrl(fileName);

  return NextResponse.json({ url: urlData.publicUrl });
}
