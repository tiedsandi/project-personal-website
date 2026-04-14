import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function isAuthorized(request) {
  return request.cookies.get("admin_token")?.value === "authenticated";
}

export async function PUT(request, { params }) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("pf_journey")
    .update({
      year_label: body.year_label,
      text: body.text,
      sort_order: body.sort_order,
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("pf_journey")
    .delete()
    .eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
