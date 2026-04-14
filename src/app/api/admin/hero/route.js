import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function isAuthorized(request) {
  return request.cookies.get("admin_token")?.value === "authenticated";
}

export async function PUT(request) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  // Get first row id
  const { data: existing } = await supabase
    .from("pf_hero")
    .select("id")
    .limit(1)
    .single();

  if (!existing)
    return NextResponse.json({ error: "Hero row not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("pf_hero")
    .update({
      badge_text: body.badge_text,
      title_line1: body.title_line1,
      title_line2: body.title_line2,
      title_line3: body.title_line3,
      description: body.description,
      stat_years: body.stat_years,
      stat_stacks: body.stat_stacks,
      stat3_value: body.stat3_value,
      stat3_label: body.stat3_label,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
