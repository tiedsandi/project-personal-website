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
    .from("pf_cv")
    .select("id")
    .limit(1)
    .single();

  if (!existing)
    return NextResponse.json({ error: "CV row not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("pf_cv")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", existing.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
