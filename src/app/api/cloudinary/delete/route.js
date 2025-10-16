import { NextResponse } from "next/server";

export async function POST(req) {
  const { publicId } = await req.json();
  if (!publicId) {
    return NextResponse.json({ error: "publicId required" }, { status: 400 });
  }

  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
