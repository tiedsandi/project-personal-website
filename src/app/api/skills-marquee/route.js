import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import supabase from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const marquee = searchParams.get("marquee");
  const proficiency = searchParams.get("proficiency");

  let query = supabase
    .from("pf_skills")
    .select("*")
    .order("name", { ascending: true });

  if (marquee === "true") {
    query = query.eq("is_marquee", true);
  }

  if (proficiency === "true") {
    query = supabase
      .from("pf_skills")
      .select("id, name, proficiency, lang_color")
      .gt("proficiency", 0)
      .order("proficiency", { ascending: false });
  }

  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
