import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("cv");

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json({ error: "Upload file PDF" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Maksimal 5MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dest = path.join(process.cwd(), "public/cv.pdf");

  await writeFile(dest, buffer);
  return NextResponse.json({ ok: true, message: "CV berhasil diupload" });
}
