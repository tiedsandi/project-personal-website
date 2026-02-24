import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/hero.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  return NextResponse.json(data);
}

export async function PUT(request) {
  const body = await request.json();
  const current = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  const updated = { ...current, ...body };
  fs.writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return NextResponse.json(updated);
}
