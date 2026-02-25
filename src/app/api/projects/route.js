import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data });
}

export async function POST(request) {
  const body = await request.json();
  const newProject = {
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

  const { data, error } = await supabase.from("projects").insert(newProject).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
