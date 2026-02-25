import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("skills_marquee").select("skills").eq("id", 1).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ skills: data.skills });
}

export async function PUT(request) {
  const body = await request.json();
  if (!Array.isArray(body.skills)) {
    return NextResponse.json({ error: "Format tidak valid" }, { status: 400 });
  }
  const { data, error } = await supabase.from("skills_marquee").update({ skills: body.skills }).eq("id", 1).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ skills: data.skills });
}
