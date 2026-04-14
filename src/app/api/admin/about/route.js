import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function isAuthorized(request) {
  return request.cookies.get("admin_token")?.value === "authenticated";
}

export async function PUT(request) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const { data: existing } = await supabase
    .from("pf_about")
    .select("id")
    .limit(1)
    .single();

  if (!existing)
    return NextResponse.json({ error: "About row not found" }, { status: 404 });

  // Only update pf_about fields — journey & skills managed separately
  const {
    badge_status,
    badge_custom,
    name,
    bio,
    info_lokasi,
    info_fokus,
    info_pengalaman,
    info_terbuka,
  } = body;
  const payload = {
    badge_status,
    badge_custom,
    name,
    bio,
    info_lokasi,
    info_fokus,
    info_pengalaman,
    info_terbuka,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("pf_about")
    .update(payload)
    .eq("id", existing.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
