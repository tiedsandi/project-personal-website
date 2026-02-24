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

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const data = readData();

  const maxId = data.projects.reduce((max, p) => Math.max(max, p.id || 0), 0);
  const newProject = {
    id: maxId + 1,
    name: body.name || "",
    company: body.company || "",
    imgName: body.imgName || "",
    date: body.date || "",
    linkGithub: body.linkGithub || "",
    linkDemo: body.linkDemo || "",
    description: body.description || "",
    tags: body.tags || [],
    type: body.type || "frontend",
    fitur: body.fitur || [],
    selected: body.selected || false,
    gifProject: body.gifProject || "",
  };

  data.projects.push(newProject);
  writeData(data);
  return NextResponse.json(newProject, { status: 201 });
}
