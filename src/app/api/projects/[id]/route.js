import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/projectList.json");

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const body = await request.json();
  const data = readData();

  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Project tidak ditemukan" }, { status: 404 });
  }

  data.projects[index] = { ...data.projects[index], ...body, id };
  writeData(data);
  return NextResponse.json(data.projects[index]);
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  const data = readData();

  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Project tidak ditemukan" }, { status: 404 });
  }

  data.projects.splice(index, 1);
  writeData(data);
  return NextResponse.json({ ok: true });
}
