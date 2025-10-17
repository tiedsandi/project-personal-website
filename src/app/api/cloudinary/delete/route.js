import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { publicId } = await req.json();
  if (!publicId)
    return NextResponse.json(
      { error: "No publicId provided" },
      { status: 400 }
    );
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
