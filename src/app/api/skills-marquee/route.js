import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/marquee-skills.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  return NextResponse.json(data);
}

export async function PUT(request) {
  const body = await request.json();
  if (!Array.isArray(body.skills)) {
    return NextResponse.json({ error: "Format tidak valid" }, { status: 400 });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify({ skills: body.skills }, null, 2), "utf-8");
  return NextResponse.json({ skills: body.skills });
}
