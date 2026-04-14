import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function isAuthorized(request) {
  return request.cookies.get("admin_token")?.value === "authenticated";
}

// UPDATE skill
export async function PUT(request, { params }) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("pf_skills")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE skill
export async function DELETE(request, { params }) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("pf_skills")
    .delete()
    .eq("id", params.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
